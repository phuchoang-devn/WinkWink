import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from 'uuid';

const accountSchema = new Schema({
    id: { type: String, required: true, unique: true, default: uuidv4 },
    email:{ type:String,required: true, unique: true},
    password:{type:String, required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null }
})

const Account = mongoose.model('Account', accountSchema);

export default Account