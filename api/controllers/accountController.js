import Account from "../models/account.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { validateRequest } from "../helpers/validator.js";

const accountController = {
    handleRegister: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { email, password } = req.body;

            const accountsWithSameEmail = await Account.findOne({ email }).exec();

            if (!accountsWithSameEmail) {
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(password, saltRounds);
                await Account.create({
                    email,
                    password: hashPassword
                });
                res.status(httpStatus.OK).send("Account is created successfully!");
            } else {
                res.status(httpStatus.BAD_REQUEST).send(`The email ${email} is already used!`);
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    handleDelete: async (req, res, next) => {
        try {
            validateRequest(req, res);

            const account = res.locals.account;
            await account.deleteOne();

            res.status(httpStatus.OK).send("Account was deleted successfully.");
            next();
        } catch (error) {
            next(error);
        }
    },

    handleUpdatePassword: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { password } = req.body;

            const account = res.locals.account;

            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            
            account.password = hashPassword;
            await account.save();
            res.status(httpStatus.OK).send("Password is updated successfully!");

            next();
        } catch (error) {
            next(error);
        }
    }
}

export default accountController