import User from "../models/user.js";
const userController = {
    // Create a new user
    createUser: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
            next();
        } catch (error) {
            next(error);
        }
    },

    // Get a user by ID
    getUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
            next();
        } catch (error) {
            next(error);
        }
    },

    // Update a user by ID
    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
            next();
        } catch (error) {
            next(error);
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res, next) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
            next();
        } catch (error) {
            next(error);
        }
    }
};

export default userController;
