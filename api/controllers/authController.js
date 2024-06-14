import Account from "../models/account.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import jwt from 'jsonwebtoken';
import { validateRequest } from "../helpers/validator.js";

const authController = {
    handleLogin: async (req, res, next) => {
        try {
            validateRequest(req, res);
            const { email, password } = req.body;

            const account = await Account.findOne({ email }).populate("user").exec();

            if (!account) {
                res.status(httpStatus.UNAUTHORIZED).json({
                    field: "email",
                    message: `Account with email ${email} doesn't exist`
                });
                return
            }

            if (await bcrypt.compare(password, account.password)) {
                const token = jwt.sign(
                    {
                        account: account._id
                    },
                    process.env.AUTH_KEY,
                    /* TODO: after finish with docker
                    { 
                        algorithm: 'RS256' 
                    }*/);

                res.cookie("AuthToken", token)
                res.status(httpStatus.OK).json(account.user);
            } else {
                res.status(httpStatus.UNAUTHORIZED).json({
                    field: "password",
                    message: `Incorrect password`
                });
            }
        } catch (error) {
            next(error);
        }
    },

    handleLogout: async(req, res) => {
        res.clearCookie('AuthToken')
        res.status(httpStatus.OK).send("Logout successfully")
    },

    authenticateAccount: async (req, res, next) => {
        if (res.headersSent) {
            return next(); // Authentication process will be skipped for login and register.
        }

        try {
            validateRequest(req, res);
            const token = req.cookies.AuthToken;
            const decoded = jwt.verify(token, process.env.AUTH_KEY);
            const account = await Account.findById(decoded.account).populate("user").exec();

            if (!account) throw new jwt.JsonWebTokenError;

            res.locals.account = account;
            res.locals.user = account.user;

            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                res.status(httpStatus.UNAUTHORIZED).send("Invalid token");
            }
            else next(error);
        }
    },
}

export default authController