import httpStatus from "http-status-codes";

export const ErrorType = Object.freeze({
  VALIDATION: "validation",
});

const errorController = {
  validationError: (error, req, res, next) => {
    if (res.locals.error !== ErrorType.VALIDATION) {
      return next(error);
    }

    const errors = error.errors;

    const errorCode = httpStatus.BAD_REQUEST;
    const isUnknownFieldErrorContained = errors[errors.length - 1].type === 'unknown_fields';
    const targetError = isUnknownFieldErrorContained ? errors[errors.length - 1] : errors[0];

    switch (targetError.type) {
      case 'field':
        res.status(errorCode);
        res.send(`Request's ${targetError.location}: ${targetError.msg} at "${targetError.path}"`);
        break;

      case 'unknown_fields':
        res.status(errorCode);
        let firstInvalidPath = targetError.fields[0];
        res.send(`Request's ${firstInvalidPath.location}: Unknown field at "${firstInvalidPath.path}"`);
        break;

      default:
        next(error);
    }
  },

  respondInternalError: (error, req, res, next) => {
    if (res.headersSent) return

    console.log(`ERROR occurred: ${error.stack}`);
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.send(`Internal Server Error`);
  },

  apiNotFound: (req, res, next) => {
    let errorCode = httpStatus.BAD_REQUEST;
    res.status(errorCode);
    res.send(`The requested API "${req.baseUrl + req.path}" doesn't exist`);
    next();
  }
}

export default errorController
