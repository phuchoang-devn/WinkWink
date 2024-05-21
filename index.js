import connectDB from './db.js';
import createUser from '.createuser.js';

// Connect to the database
connectDB()
  .then(() => {
    // Create a new user after successful connection
    createUser();
  })
  .catch((error) => {
    console.error('Failed to connect to the database and create user:', error);
  });
