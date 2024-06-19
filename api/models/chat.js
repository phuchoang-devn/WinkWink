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

    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
        // currentTime: () => Date.now()
    },
    methods: {
        getChatForPost() {
            return {
                id: this._id,
                content: this.content,
                createdAt: this.createdAt,
                order: this.order
            }
        },

        getChatForGet(requestMaker) {
            return {
                id: this._id,
                isMine: this.sender.toString() === requestMaker.toString(),
                content: this.content,
                createdAt: this.createdAt,
                order: this.order
            }
        }
    }
});

chatSchema.pre("save", async function() {
    const chatMetadata = await ChatMetadata.findOne({ 
        ofUser: this.sender
    }).exec()

    if(chatMetadata)
        this.order = chatMetadata.total
})

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
        chatMetadata.total += 1
        await chatMetadata.save()
    } else {
        console.error("ChatMetadata need to be created before Chat")
    }
}

const Chat =  mongoose.model("Chat", chatSchema);
export default Chat;