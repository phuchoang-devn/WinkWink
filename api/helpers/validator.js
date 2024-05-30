import { validationResult } from "express-validator";
import { ErrorType } from "../controllers/errorController.js";

export const validateRequest = (req, res) => {
    try{
        validationResult(req).throw();
    } catch(error) {
        res.locals.error = ErrorType.VALIDATION;
        throw error;
    }
}