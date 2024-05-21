import User from './models/User.js';

const createUser = async () => {
  const newUser = new User({
    id: 'some-unique-uuid',
    name: {
      first: 'John',
      last: 'Doe'
    },
    profileImage: 'john_doe.png',
    age: 30,
    sex: 'male',
    country: 'US',
    interests: 'Reading, Traveling',
    language: ['eng'],
    preferences: {
      age: {
        from: 25,
        to: 35
      },
      sex: 'female'
    },
    hasLiked: [],
    hasDisliked: [],
    hasMatched: []
  });

  try {
    await newUser.save();
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export default createUser;
