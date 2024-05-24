// Use the 'dating-app' database
db = db.getSiblingDB('dating-app');

// Create the 'users' collection and insert documents
db.createCollection('users');
db.users.insertMany([
  { name: 'Alice', age: 25, gender: 'female' },
  { name: 'Bob', age: 30, gender: 'male' },
  { name: 'Charlie', age: 35, gender: 'male' }
]);
print('Inserted users into users collection');

// Create the 'profiles' collection and insert documents
db.createCollection('profiles');
db.profiles.insertMany([
  { userId: 1, bio: 'Love hiking and outdoor activities', interests: ['hiking', 'reading'] },
  { userId: 2, bio: 'Avid traveler and foodie', interests: ['travel', 'food'] },
  { userId: 3, bio: 'Tech enthusiast and gamer', interests: ['tech', 'gaming'] }
]);
print('Inserted profiles into profiles collection');

// Create indexes if necessary
db.users.createIndex({ name: 1 });
db.profiles.createIndex({ userId: 1 });
print('Created indexes on users and profiles collections');

// Indicate script completion
print('Initialization script completed successfully');
