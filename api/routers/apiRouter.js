import { Router } from 'express';
import transactionController from "../controllers/transactionController.js";
import accountController from '../controllers/accountController.js';
import errorController from '../controllers/errorController.js';


const apiRouter = Router();

apiRouter.use(transactionController.startTransaction);

// TODO: routers - logic api 
apiRouter.post('/login', accountController.handleLogin);
apiRouter.post('/register', accountController.handleRegister);

apiRouter.post('/register', (req, res) => {
  //logic
})
apiRouter.get('/profiles', (req, res) => {
  //logic
})
apiRouter.post('/action', (req, res) => {
  //logic
})
apiRouter.post('/chat', (req, res) => {
  //logic
})
apiRouter.delete('/chat', (req, res) => {
  //logic
})
apiRouter.put('/settings', (req, res) => {
  //logic
})
apiRouter.put('/password', (req, res) => {
  //logic
})
apiRouter.put('/prefrence', (req, res) => {
  //logic
})

apiRouter.all('*', errorController.apiNotFound);

apiRouter.use(transactionController.commitTransaction);
apiRouter.use(transactionController.abortTransaction);

export default apiRouter;