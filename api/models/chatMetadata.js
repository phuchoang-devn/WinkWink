import mongoose, { Schema } from "mongoose";
import User from "./user.js";

const chatMetadataSchema = new Schema({
    ofUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: [true, "ChatMetadata: 'ofUser' is missing"]
    },

    matchedUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "ChatMetadata: 'matchedUser' is missing"]
    },

    lastMessage: {
        type: String,
        trim: true,
        minLength: [1, "ChatMetadata: 'lastMessage' must have at least 1 characters"],
        maxLength: [50, "ChatMetadata: 'lastMessage' can't not exceed 50 characters"],
        default: null
    },

    isSeen: {
        type: Boolean,
        default: false
    },

    total: {
        type: Number,
        default: 0
    },

    isUnmatched: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: false,
        updatedAt: true
    },
    
    methods: {
        async getResChatMetadata() {
            const matchedUser = await User.findById(this.matchedUser).exec()

            return {
                id: this._id,
                matchedUserId: this.matchedUser,
                matchedUserName: matchedUser.fullName,
                lastMessage: this.lastMessage,
                isSeen: this.isSeen,
                updatedAt: this.updatedAt,
                total: this.total,
                isUnmatched: this.isUnmatched
            }
        }
    }
});

const ChatMetadata = mongoose.model("ChatMetadata", chatMetadataSchema);
export default ChatMetadata;