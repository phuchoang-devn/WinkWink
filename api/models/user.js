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
        default: ""
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
    hasUnmatched: [{ 
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
    },

    methods: {
        getResponseUser() {
            return {
                name: {
                    first: this.name.first,
                    last: this.name.last
                },
                age: this.age,
                sex: this.sex,
                country: this.country,
                interests: this.interests,
                language: this.language,
                preferences: {
                    age: {
                        from: this.preferences.age.from,
                        to: this.preferences.age.to
                    },
                    sex: this.preferences.sex
                }
            }
        }
    },

    statics: {
        getResponseUserForWink(user) {
            return {
                id: user._id,
                fullName: user.name.first + " " + user.name.last,
                age: user.age,
                sex: user.sex,
                country: user.country,
                interests: user.interests,
                language: user.language
            }
        },
    }
});

const User = mongoose.model('User', userSchema);
export default User;
