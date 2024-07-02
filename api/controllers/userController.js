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
        getUser: async (req, res, next) => {
            try {
                const userAccount = res.locals.account;
                const user = userAccount.user;
                console.log(user);
                res.status(200).json(user.getResponseUser());
            } catch (error) {
                next(error);
            }
        },
    
        updateUser: async (req, res, next) => {
            try {
                const userAccount = res.locals.account;
                const user = userAccount.user;
                const updatedUser = await user.updateUser(req.params.id, req.body, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(updatedUser);
            } catch (error) {
                next(error);
            }
        },
    
        deleteUser: async (req, res, next) => {
            try {
                const userAccount = res.locals.account;
                const user = userAccount.user;
                await user.deleteUser();
                res.status(204).end();
            } catch (error) {
                next(error);
            }
        }
    };

    
export default userController;
