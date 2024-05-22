import mongoose, { Schema } from "mongoose";

const chatMetadataSchema = new Schema({
    ofUser: {
        type: Schema.Types.ObjectId,
        // ref: "User",
        index: true,
        required: [true, "ChatMetadata: 'ofUser' is missing"]
    },

    matchedUser: {
        type: Schema.Types.ObjectId,
        // ref: "User",
        required: [true, "ChatMetadata: 'matchedUser' is missing"]
    },

    lastMessage: {
        type: String,
        trim: true,
        minLength: [1, "ChatMetadata: 'lastMessage' must have at least 1 characters"],
        maxLength: [50, "ChatMetadata: 'lastMessage' can't not exceed 50 characters"],
        required: [true, "ChatMetadata: 'lastMessage' is missing"]
    },

    isSeen: {
        type: Boolean,
        required: [true, "ChatMetadata: 'isSeen' is missing"]
    },
}, {
    timestamps: {
        createdAt: false,
        updatedAt: true
    }
});

export const ChatMetadata = mongoose.model("ChatMetadata", chatMetadataSchema);