// Use the 'winkwink' database
db = db.getSiblingDB('winkwink');

// Drop the existing 'users' collection if it exists
db.users.drop();

// Create the 'users' collection
db.createCollection('users');

//here we can select how many users will we randomly crete
const amountofusers = 30 ;

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
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
    const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden'];
    const interestsList = ['reading', 'traveling', 'sports', 'music', 'cooking', 'hiking', 'gaming', 'art', 'dancing', 'photography'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Russian', 'Portuguese', 'Italian'];

    const sex = getRandomElement(['male', 'female', 'other']);
    const firstName = sex === 'male' ? getRandomElement(maleFirstNames) : sex === 'female' ? getRandomElement(femaleFirstNames) : getRandomElement([...maleFirstNames, ...femaleFirstNames]);
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

// Generate and insert 30 random users
const users = [];
for (let i = 1; i <= amountofusers; i++) {
    users.push(generateRandomUser(i));
}
db.users.insertMany(users);

print('Inserted 30 users into users collection');

// Create indexes if necessary
db.users.createIndex({ id: 1 });
db.users.createIndex({ 'name.first': 1 });
db.users.createIndex({ age: 1 });
db.users.createIndex({ country: 1 });
db.users.createIndex({ 'preferences.age.from': 1, 'preferences.age.to': 1 });

print('Created indexes on users collection');

// Indicate script completion
print('Initialization script completed successfully');
