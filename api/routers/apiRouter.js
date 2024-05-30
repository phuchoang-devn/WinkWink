import { Router } from 'express';
import transactionController from "../controllers/transactionController.js";
import accountController from '../controllers/accountController.js';
import errorController from '../controllers/errorController.js';
import { checkExact, checkSchema, header } from 'express-validator';
import authController from '../controllers/authController.js';


const apiRouter = Router();

apiRouter.use(transactionController.startTransaction);

// TODO: routers - logic api 
apiRouter.get(
  '/login', 
  checkExact(
    checkSchema({
      email: { isString: true },
      password: { isString: true },
    }, ["body"])
  ),
  authController.handleLogin
);

apiRouter.post(
  '/register', 
  checkExact(
    checkSchema({
      email: { isEmail: true },
      password: { isLength: { options: { min: 8 } } },
    }, ['body'])
  ),
  accountController.handleRegister
);


// The following URLs require Authentication
apiRouter.use(
  header('Authorization').notEmpty(),
  authController.authenticateAccount
);


apiRouter.get('/profiles', (req, res) => {
  //logic
})
apiRouter.post('/action', (req, res) => {
  //logic
})
apiRouter.post('/chat', (req, res) => {
  //logic
})

apiRouter.delete(
  '/account', 
  accountController.handleDelete
);

apiRouter.put(
  '/account/password', 
  checkExact(
    checkSchema({
      password: { isLength: { options: { min: 8 } } },
    }, ['body'])
  ),
  accountController.handleUpdatePassword
);

apiRouter.delete('/chat', (req, res) => {
  //logic
})
apiRouter.put('/settings', (req, res) => {
  //logic
})
apiRouter.put('/prefrence', (req, res) => {
  //logic
})

apiRouter.all('*', errorController.apiNotFound);

apiRouter.use(transactionController.commitTransaction);
apiRouter.use(transactionController.abortTransaction);

apiRouter.use(errorController.validationError);

export default apiRouter;