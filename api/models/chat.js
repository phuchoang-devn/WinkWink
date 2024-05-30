import mongoose, { Schema } from "mongoose";

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
}, { timestamps: true });

chatSchema.post("save", function(chat) {
    //logic: update ChatMetadata of both sender and receiver when new message is created
});

chatSchema.post(["remove", "deleteOne", "findOneAndDelete"], function(chat) {
    //logic: update ChatMetadata of both sender and receiver if LAST message is deleted
})

const Chat =  mongoose.model("Chat", chatSchema);
export default Chat;