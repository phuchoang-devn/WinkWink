import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: { 
        type: String, 
        required: [true, "Account: 'id' is missing"], 
    
    },
    name: {
        first: { 
            type: String, 
            required: [true, "Account: 'first name' is missing"] 
        },
        last: { 
            type: String, 
            required: [true, "Account: 'last name' is missing"] 
        }
    },
    profileImage: String,
    age: { 
        type: Number, 
        required: [true, "Account: 'age' is missing"] 
    },
    sex: { 
        type: String, 
        required: [true, "Account: 'sex' is missing"],
        enum: {
            values: ['male', 'female', 'other'],
            message: "Account: 'sex' must be either 'male', 'female', or 'other'"
        }
    },
    country: {
        type: String,
        required: [true, "Account: 'country' is missing"]
    },
    interests: {
        type: String,
        required: [true, "Account: 'interests' is missing"]
    },
    language: { 
        type: [String], 
        required: [true, "Account: 'language' is missing"] 
    },
    preferences: {
        age: {
            from: { 
                type: Number, 
                required: [true, "Account: 'preferences.age.from' is missing"] 
            },
            to: { 
                type: Number, 
                required: [true, "Account: 'preferences.age.to' is missing"] 
            }
        },
        sex: { 
            type: String, 
            required: [true, "Account: 'preferences.sex' is missing"] 
        }
    },
    hasLiked: [String],
    hasDisliked: [String],
    hasMatched: [String]
});

export const User = mongoose.model('User', userSchema);
