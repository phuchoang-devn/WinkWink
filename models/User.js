import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  profileImage: { type: String, unique: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ["male", "female"], required: true },
  country: { type: String, required: true },
  interests: { type: String },
  language: { type: [String] },
  preferences: {
    age: {
      from: { type: Number, required: true },
      to: { type: Number, required: true }
    },
    sex: { type: String, enum: ["male", "female"], required: true }
  },
  hasLiked: { type: [String], default: [] },
  hasDisliked: { type: [String], default: [] },
  hasMatched: { type: [String], default: [] }
});

const User = mongoose.model("User", userSchema);

export default User;
