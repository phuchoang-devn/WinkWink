import mongoose, { Schema } from "mongoose";
import ChatMetadata from "./chatMetadata.js"

const chatSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: [true, "Chat: 'sender' is missing"]
    },

    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Chat: 'receiver' is missing"]
    },

    content: {
        type: String,
        trim: true,
        minLength: [1, "Chat: 'content' must have at least 1 characters"],
        required: [true, "Chat: 'content' is missing"]
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
    methods: {
        getChatForPost() {
            return {
                id: this._id,
                content: this.content,
                createdAt: this.createdAt
            }
        },

        getChatForGet(requestMaker) {
            return {
                id: this._id,
                isMine: this.sender.toString() === requestMaker.toString(),
                content: this.content,
                createdAt: this.createdAt
            }
        }
    }
});

chatSchema.post("save", async function(chat) {
    // update chat metadata of sender
    await updateChatMetadata(chat, true)

    // update chat metadata of receiver
    await updateChatMetadata(chat, false)
});

async function updateChatMetadata(chat, isOwnedBySender) {
    const owner = isOwnedBySender ? chat.sender : chat.receiver
    const partner = isOwnedBySender ? chat.receiver : chat.sender
    const shortenedChatContent = chat.content.substring(0, 50)

    const chatMetadata = await ChatMetadata.findOne({ 
        ofUser: owner
    }).exec()

    if(chatMetadata) {
        chatMetadata.lastMessage = shortenedChatContent
        chatMetadata.isSeen = isOwnedBySender
        await chatMetadata.save()
    } else {
        await ChatMetadata.create({
            ofUser: owner,
            matchedUser: partner,
            lastMessage: shortenedChatContent,
            isSeen: isOwnedBySender
        })
    }
}

const Chat =  mongoose.model("Chat", chatSchema);
export default Chat;