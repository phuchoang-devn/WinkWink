import User from "../models/user.js"
import Account from "../models/account.js"
import Chat from "../models/chat.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { validateRequest } from "../helpers/validator.js";
import { isValidObjectId } from "mongoose";
import ChatMetadata from "../models/chatMetadata.js";
import { SocketAction, authenticateConnection, deleteUnauthConnection } from "../web_socket/wsServer.js";
import { sendSocketMessage } from "../web_socket/wsClient.js";
import path from "path";
import { __dirname } from "../../main.js";
import { type } from "os";


const appController = {
    createTestUser: async (req, res, next) => {
        const fakeUser = (first, last) => ({
            name: {
                first,
                last
            },
            profileImage: "image.jpg",
            age: 30,
            sex: "non-binary",
            country: "DE",
            interests: "I like...",
            language: "eng",
            preferences: {
                age: {
                    from: 18,
                    to: 100
                },
                sex: "non-binary"
            }
        })

        const user1 = await User.create(fakeUser("Donald", "Trump"))
        const user2 = await User.create(fakeUser("Joe", "Biden"))

        //user1.hasMatched.push(user2)
        await user1.save()

        //user2.hasMatched.push(user1)
        await user2.save()

        const account1 = {
            email: "account1@gmail.com",
            password: "12345678",
            user: user1._id
        }
        const accountsWithSameEmail1 = await Account.findOne({ email: account1.email }).exec();
        if (!accountsWithSameEmail1) {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(account1.password, saltRounds)
            await Account.create({
                email: account1.email,
                password: hashPassword,
                user: user1._id
            });
        } else {
            accountsWithSameEmail1.user = user1._id;
            await accountsWithSameEmail1.save()
        }

        const account2 = {
            email: "account2@gmail.com",
            password: "12345678",
            user: user2._id
        }
        const accountsWithSameEmail2 = await Account.findOne({ email: account2.email }).exec();
        if (!accountsWithSameEmail2) {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(account2.password, saltRounds)
            await Account.create({
                email: account2.email,
                password: hashPassword,
                user: user2._id
            });
        } else {
            accountsWithSameEmail2.user = user2._id;
            await accountsWithSameEmail2.save()
        }

        res.status(200).json({
            account1,
            account2
        })
        next()
    },

    wsRegister: async (req, res, next) => {
        const { conn } = req.body;
        const userAccount = res.locals.account;

        const user = userAccount.user;

        if (!user) {
            deleteUnauthConnection(conn);
            res.status(httpStatus.BAD_REQUEST).send("Connection failed");
            return next();
        }

        const result = authenticateConnection(conn, user._id);
        if (result.auth || result.isExisted)
            res.status(httpStatus.OK).send("Connection established")
        else res.status(httpStatus.BAD_REQUEST).send("Connection failed")
        next();
    },

    postChat: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { receiverId } = req.params;
            const { content } = req.body;
            const senderAccount = res.locals.account;

            const sender = senderAccount.user;

            const hasAccepttoChat = sender.hasMatched.map(id => id.toString()).includes(receiverId)
            if (hasAccepttoChat) {
                const receiver = await User.findById(receiverId).exec();

                const chat = await Chat.create({
                    sender: sender._id,
                    receiver: receiver._id,
                    content
                });

                const responseChat = chat.getChatForPost();

                sendSocketMessage({
                    type: SocketAction.CHAT,
                    payload: {
                        receiver: receiverId,
                        content: {
                            sender: sender.id,
                            chat: responseChat
                        }
                    }
                })

                res.status(httpStatus.OK).json(responseChat);
            } else {
                res.status(httpStatus.BAD_REQUEST).send(`You aren't matched with the user "${receiverId}"`);
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    getChats: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const CHATS_PER_PAGE = 20;
            const { matchedUserId, chatOrder } = req.params;
            const userAccount = res.locals.account;

            const user = userAccount.user;
            const matchedUser = isValidObjectId(matchedUserId) ? await User.findById(matchedUserId).exec() : undefined;

            const query = {
                $or: [
                    {
                        sender: user._id,
                        receiver: matchedUserId
                    },
                    {
                        sender: matchedUserId,
                        receiver: user._id
                    },
                ]
            }

            if (chatOrder) query.order = {
                $lt: chatOrder,
            }

            if (matchedUser) {
                const chats = await Chat.find(query)
                    .sort({ order: -1 })
                    .limit(CHATS_PER_PAGE);

                const responseChats = chats.map(chat => chat.getChatForGet(user._id));
                res.status(httpStatus.OK).json(responseChats);
            } else {
                res.status(httpStatus.BAD_REQUEST).send(`User with ID "${matchedUserId}" doesn't exist`);
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    getChatMetadata: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const CHATS_PER_PAGE = 20;
            const { time } = req.params;
            const userAccount = res.locals.account;

            const user = userAccount.user;

            const query = time ? {
                ofUser: user._id,
                updatedAt: { $lt: time }
            } : {
                ofUser: user._id
            }

            const chatmetadatas = await ChatMetadata.find(query)
                .sort({ updatedAt: -1 })
                .limit(CHATS_PER_PAGE)
                .exec();

            const responseMetadatas = await Promise.all(chatmetadatas.map(async data => await data.getResChatMetadata()))
            res.status(httpStatus.OK).json(responseMetadatas);

            next();
        } catch (error) {
            next(error);
        }
    },

    updateSeenChat: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { chatmetadataId } = req.params;
            const { isSeen } = req.body;

            const userAccount = res.locals.account;

            const user = userAccount.user;

            const chatmetadata = isValidObjectId(chatmetadataId) ? await ChatMetadata.findById(chatmetadataId).exec() : undefined;

            const doesUserHasMetadata = chatmetadata && chatmetadata.ofUser.toString() === user._id.toString();
            if (doesUserHasMetadata) {
                chatmetadata.isSeen = isSeen;
                await chatmetadata.save();
                res.status(httpStatus.OK).send(`Update chat-metadata ${chatmetadataId} successfully`);
            } else {
                res.status(httpStatus.BAD_REQUEST).send(`You don't have the chat-metadata "${chatmetadataId}"`);
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    getImageChat: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { matchedUserId } = req.params;
            const account = res.locals.account;

            const hasMatched = account.user.hasMatched.map(id => id.toString());
            const isAlreadyMatched = hasMatched.includes(matchedUserId);
            if (isAlreadyMatched) {
                const matchedUser = await User.findById(matchedUserId).exec();

                res.status(httpStatus.OK).sendFile(path.join(__dirname, "profile_image", matchedUser.profileImage));
            } else res.status(httpStatus.BAD_REQUEST).send(`No match with user "${matchedUserId}"`);
        } catch (error) {
            next(error)
        }
    },

    findFriends: async (req, res, next) => {
        const MAX_RES_LENGTH = 10;

        try {
            validateRequest(req, res);
            const except = req.query.except || [];
            const user = res.locals.account.user;

            if (except.length >= MAX_RES_LENGTH) {
                res.status(httpStatus.BAD_REQUEST).send(`Length of except[] should under ${MAX_RES_LENGTH}`)
                return next()
            }

            const hasMatched = user.hasMatched.map(id => id.toString());
            const hasLiked = user.hasLiked.map(id => id.toString());
            const hasDisliked = user.hasDisliked.map(id => id.toString());

            const suggestedFriends = [
                ...except,
                ...hasMatched,
                ...hasLiked,
                ...hasDisliked
            ];

            const newFriends = await User.aggregate().match({
                _id: { $nin: suggestedFriends },
                age: {
                    $gte: user.preferences.age.from,
                    $lte: user.preferences.age.to
                },
                sex: user.preferences.sex,
                country: user.country,
                language: { $in: user.language },
                "preferences.sex": user.sex,
                "preferences.age.from": { $lte: user.age },
                "preferences.age.to": { $gte: user.age }
            }).sample(MAX_RES_LENGTH - except.length).exec();

            const responseValue = newFriends.map(nf => User.getResponseUserForWink(nf));
            res.status(httpStatus.OK).json(responseValue)
            next()
        } catch (error) {
            next(error)
        }
    },

    handleWink: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { id, isWink } = req.body;
            const user = res.locals.account.user;

            if (user._id.toString() === id) {
                res.status(httpStatus.BAD_REQUEST).send(`You can't wink with yourself`);
                return next();
            } else if (
                user.hasLiked.includes(id)
                || user.hasDisliked.includes(id)
                || user.hasMatched.includes(id)
            ) {
                res.status(httpStatus.BAD_REQUEST).send(`You have winked to this user "${id}"`);
                return next();
            }

            const friend = isValidObjectId(id) ? await User.findById(id).exec() : undefined;

            if (friend) {
                if (isWink) {
                    if (friend.hasLiked.includes(user._id)) {
                        // When users get matched...
                        
                        user.hasMatched.push(friend);
                        friend.hasMatched.push(user);
                        friend.hasLiked = friend.hasLiked.filter(value => value.toString() !== user._id.toString());

                        const chatMetadatas = await ChatMetadata.insertMany([
                            {
                                ofUser: user._id,
                                matchedUser: friend._id
                            },
                            {
                                ofUser: friend._id,
                                matchedUser: user._id,
                            }
                        ])

                        var responseValue = {
                            isMatched: true,
                            chatMetadata: await chatMetadatas[0].getResChatMetadata()
                        }

                        sendSocketMessage({
                            type: SocketAction.MATCH,
                            payload: {
                                receiver: friend._id,
                                chatMetadata: await chatMetadatas[1].getResChatMetadata()
                            }
                        })

                    } else {
                        user.hasLiked.push(friend);
                        var responseValue = { isMatched: false }
                    }
                } else {
                    friend.hasDisliked.push(user);
                    user.hasDisliked.push(friend)
                }

                await friend.save();
                await user.save();
                res.status(httpStatus.OK)

                if (responseValue)
                    res.json(responseValue);
                else res.send("Wink action successfully");

            } else res.status(httpStatus.BAD_REQUEST).send(`User "${id}" doesn't exist`);

            next()
        } catch (error) {
            next(error)
        }
    }
}

export default appController