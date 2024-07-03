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
            const { currentPassword } = req.body;
            const account = res.locals.account;

            if (await bcrypt.compare(currentPassword, account.password)) {
                await account.deleteOne();
                res.status(httpStatus.OK).send("Account was deleted successfully.");
            } res.status(httpStatus.BAD_REQUEST).send("Current Password is wrong!")

            next();
        } catch (error) {
            next(error);
        }
    },

    handleUpdatePassword: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { currentPassword, newPassword } = req.body;
            const account = res.locals.account;

            if (await bcrypt.compare(currentPassword, account.password)) {
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(newPassword, saltRounds);

                account.password = hashPassword;
                await account.save();
                res.status(httpStatus.OK).send("Password is updated successfully!");
            } else res.status(httpStatus.BAD_REQUEST).send("Current Password is wrong!")

            next();
        } catch (error) {
            next(error);
        }
    }
}

export default accountController