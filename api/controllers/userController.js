// all with url /api/my/{id}

import User from 'dating-app/api/models/user.js';

const userController = {
    // Create a new user
    createUser: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    // Get a user by ID
    getUserById: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // Update a user by ID
    updateUser: async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    },

    // Get all users
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
};

export default userController;
