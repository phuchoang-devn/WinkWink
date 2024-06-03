// Use the 'winkwink' database
db = db.getSiblingDB('winkwink');

// Drop the existing 'users' collection if it exists
db.users.drop();

// Create the 'users' collection
db.createCollection('users');

// Define the number of users to create
const amountOfUsers = 30;

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
        sex = 'other'; // 10% probability for other
    }

    let firstName;
    if (sex === 'male') {
        firstName = getRandomElement(maleFirstNames);
    } else if (sex === 'female') {
        firstName = getRandomElement(femaleFirstNames);
    } else { // For 'other' category
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
    const preferencesSex = getRandomElement(['male', 'female', 'other']);

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

// Generate and insert random users
const users = [];
for (let i = 1; i <= amountOfUsers; i++) {
    users.push(generateRandomUser(i));
}
db.users.insertMany(users);

print(`Inserted ${amountOfUsers} users into users collection`);

// Create indexes if necessary
db.users.createIndex({ id: 1 });
db.users.createIndex({ 'name.first': 1 });
db.users.createIndex({ age: 1 });
db.users.createIndex({ country: 1 });
db.users.createIndex({ 'preferences.age.from': 1, 'preferences.age.to': 1 });

print('Created indexes on users collection');

// Indicate script completion
print('Initialization script completed successfully');
