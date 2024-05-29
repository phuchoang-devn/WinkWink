import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    id: { type: String, required: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    profileImage: String,
    age: Number,
    sex: String,
    country: String,
    interests: String,
    language: [String],
    preferences: {
        age: {
            from: Number,
            to: Number
        },
        sex: String
    },
    hasLiked: [String],
    hasDisliked: [String],
    hasMatched: [String]
});

export const User = mongoose.model('User', userSchema);
