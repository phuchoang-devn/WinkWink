import connectDB from './db.js';
import createUser from './createuser.js';
import createAccount from "./createAccount.js";

// Connect to the database
connectDB()
  .then(() => {
    // Create a new user after successful connection
      createAccount();
      createUser();
  })
  .catch((error) => {
    console.error('Failed to connect to the database and create user:', error);
  });
