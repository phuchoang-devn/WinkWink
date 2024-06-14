import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
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

    profileImage: { 
        type: String, 
        required: [true, "Account: 'age' is missing"] 
    },

    age: { 
        type: Number, 
        required: [true, "Account: 'age' is missing"] 
    },

    sex: { 
        type: String, 
        required: [true, "Account: 'sex' is missing"],
        enum: {
            values: ['male', 'female', 'non-binary'],
            message: "Account: 'sex' must be either 'male', 'female', or 'non-binary'"
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
    
    hasLiked: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    }],

    hasDisliked: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    }],

    hasMatched: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    }],
}, {
    virtuals: {
        fullName: {
            get() {
                return this.name.first + ' ' + this.name.last
            }
        }
    }
});

const User = mongoose.model('User', userSchema);
export default User;
