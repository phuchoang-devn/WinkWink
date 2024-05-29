import httpStatus from "http-status-codes";

const errorController = {
  respondInternalError: (error, req, res, next) => {
    console.log(`ERROR occurred: ${error.stack}`);

    if (!res.headersSent) {
      let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(errorCode);
      res.send(`Internal Server Error`);
    }
  },

  apiNotFound: (req, res, next) => {
    if (!res.headersSent) {
      let errorCode = httpStatus.BAD_REQUEST;
      res.status(errorCode);
      res.send(`The requested API "${req.baseUrl + req.path}" doesn't exist`);
    }

    next();
  }
}

export default errorController
