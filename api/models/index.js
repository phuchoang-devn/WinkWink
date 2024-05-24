const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path according to your file structure

mongoose.connect('mongodb://localhost:27017/dating-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Example usage: creating a new user
const createUser = async () => {
    try {
        const user = new User({
            id: '12345',
            name: { first: 'John', last: 'Doe' },
            profileImage: 'path/to/image.jpg',
            age: 28,
            sex: 'male',
            country: 'USA',
            interests: 'Hiking, Reading',
            language: ['English'],
            preferences: {
                age: { from: 25, to: 30 },
                sex: 'female'
            },
            hasLiked: [],
            hasDisliked: [],
            hasMatched: []
        });

        const savedUser = await user.save();
        console.log('User created:', savedUser);
    } catch (err) {
        console.error('Error creating user:', err);
    } finally {
        mongoose.connection.close();
    }
};

createUser();
