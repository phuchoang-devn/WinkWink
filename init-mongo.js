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

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/winkwink', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Helper functions to generate random values
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomUser(id) {
    const maleFirstNames = ['Bob', 'Charlie', 'David', 'Frank', 'Ivan', 'John', 'Kevin', 'Liam', 'Michael', 'Tom'];
    const femaleFirstNames = ['Alice', 'Eva', 'Grace', 'Hannah', 'Julia', 'Laura', 'Mary', 'Nina', 'Olivia', 'Sophia'];
    const otherFirstNames = ['Jordan', 'Alex', 'Taylor', 'Casey', 'Drew', 'Cameron', 'Jamie', 'Jordan', 'Kendall', 'Peyton'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
    const countries = ["US", "CA", "GB", "AU", "DE", "FR", "ES", "IT", "NL", "SE"];
    const interestsList = ['reading', 'traveling', 'sports', 'music', 'cooking', 'hiking', 'gaming', 'art', 'dancing', 'photography'];
    const languages = ["eng", "spa", "fre", "ger", "chi", "jpn", "kor", "rus", "por", "ita"];

    // Generate a random number between 0 and 99 for gender probability
    const genderProb = getRandomInt(0, 99);
    let sex;
    if (genderProb < 45) {
        sex = 'male'; // 45% probability for male
    } else if (genderProb < 90) {
        sex = 'female'; // 45% probability for female
    } else {
        sex = 'non-binary'; // 10% probability for other
    }

    let firstName;
    if (sex === 'male') {
        firstName = getRandomElement(maleFirstNames);
    } else if (sex === 'female') {
        firstName = getRandomElement(femaleFirstNames);
    } else { // For 'non-binary' category
        firstName = getRandomElement(otherFirstNames);
    }

    const lastName = getRandomElement(lastNames);
    const country = getRandomElement(countries);
    const interests = `${getRandomElement(interestsList)}, ${getRandomElement(interestsList)}`;
    const userLanguages = [getRandomElement(languages)];
    if (Math.random() > 0.5) {
        userLanguages.push(getRandomElement(languages));
    }
    const age = getRandomInt(18, 65);
    const preferencesAgeFrom = getRandomInt(18, 30);
    const preferencesAgeTo = getRandomInt(31, 65);
    const preferencesSex = getRandomElement(['male', 'female', 'non-binary']);

    return {
        id: id.toString(),
        name: { first: firstName, last: lastName },
        profileImage: `profile${id}.png`,
        age: age,
        sex: sex,
        country: country,
        interests: interests,
        language: userLanguages,
        preferences: {
            age: { from: preferencesAgeFrom, to: preferencesAgeTo },
            sex: preferencesSex
        },
        hasLiked: [],
        hasDisliked: [],
        hasMatched: []
    };
}

// Drop the existing 'users' collection if it exists
User.collection.drop()
    .then(() => console.log('Dropped existing users collection'))
    .catch(err => console.log('No existing users collection to drop'));

// Define the number of users to create
const amountOfUsers = 30;

// Generate and insert random users
const users = [];
for (let i = 1; i <= amountOfUsers; i++) {
    users.push(generateRandomUser(i));
}

User.insertMany(users)
    .then(() => {
        console.log(`Inserted ${amountOfUsers} users into users collection`);
        // Create indexes if necessary
        return User.collection.createIndexes([
            { key: { id: 1 } },
            { key: { 'name.first': 1 } },
            { key: { age: 1 } },
            { key: { country: 1 } },
            { key: { 'preferences.age.from': 1, 'preferences.age.to': 1 } }
        ]);
    })
    .then(() => console.log('Created indexes on users collection'))
    .then(() => console.log('Initialization script completed successfully'))
    .catch(err => console.error('Error inserting users or creating indexes', err))
    .finally(() => mongoose.connection.close());
