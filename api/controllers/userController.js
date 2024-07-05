import { OS_IP_ADDRESS } from "../../main.js";
import { validateRequest } from "../helpers/validator.js";
import User from "../models/user.js";
import httpStatus from "http-status-codes";

const userController = {
    createUser: async (req, res, next) => {
        try {
            validateRequest(req, res)
            const profile = req.body;
            const account = res.locals.account;

            if (account.user) {
                res.status(httpStatus.BAD_REQUEST).send("This account already has a profile.")
            } else {
                const newUser = await User.create(profile)

                account.user = newUser._id
                await account.save()

                res.status(httpStatus.OK).json({
                    uInfo: newUser.getResponseUser(),
                    ipAddr: `${OS_IP_ADDRESS || "localhost"}:${process.env.WS_PORT || 8000}`
                })
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = res.locals.account.user
            
            if (!user) {
                res.status(httpStatus.BAD_REQUEST).send('User not found');
            } else {
                res.status(httpStatus.OK).json({
                    uInfo: user.getResponseUser(),
                    ipAddr: `${OS_IP_ADDRESS || "localhost"}:${process.env.WS_PORT || 8000}`
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            validateRequest(req, res)
            const user = res.locals.account.user
            const newProfile = req.body

            if (!user) {
                res.status(httpStatus.BAD_REQUEST).send('User not found');
            } else {
                const newUser = await User.findByIdAndUpdate(user._id, newProfile, { new: true }).exec()
                res.status(httpStatus.OK).json({
                    uInfo: newUser.getResponseUser()
                });
            }

            next()
        } catch (error) {
            next(error);
        }
    },
};


export default userController;
