import mongoose, { Schema } from "mongoose";
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

module.exports = mongoose.model('User', userSchema);
