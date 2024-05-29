// Use the 'winkwink' database
db = db.getSiblingDB('winkwink');

// Create the 'users' collection and insert documents
db.createCollection('test');
db.users.insertMany([
  { name: 'Alice', age: 25, gender: 'female' },
  { name: 'Bob', age: 30, gender: 'male' },
  { name: 'Charlie', age: 35, gender: 'male' }
]);
print('Inserted users into users collection');


// Create indexes if necessary
db.users.createIndex({ name: 1 });
print('Created indexes on users and profiles collections');

// Indicate script completion
print('Initialization script completed successfully');
