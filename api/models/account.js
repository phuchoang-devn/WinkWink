import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
    email: { 
        type: String,
        required: [true, "Account: 'email' is missing"], 
        unique: [true, "Account: 'email' need to be unique"]
    },

    password: {
        type: String, 
        required: [true, "Account: 'password' is missing"]
    },

    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    }
})

const Account = mongoose.model('Account', accountSchema);

export default Account