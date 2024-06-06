import { Router } from 'express';
import transactionController from "../controllers/transactionController.js";
import accountController from '../controllers/accountController.js';
import errorController from '../controllers/errorController.js';
import { checkExact, checkSchema, header, param } from 'express-validator';
import authController from '../controllers/authController.js';
import appController from '../controllers/appController.js';


const apiRouter = Router();

apiRouter.use(transactionController.startTransaction);


apiRouter.get(
  '/test',
  appController.createTestUser
)

/*
Response:
401 - error message
200 - { token, user }
*/
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

/*
Response:
400 - error message
200 - success message
*/
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


/*  ---------------------------------------------------------------------------------------------
    The following URLs require Authorization 
    ---------------------------------------------------------------------------------------------

Response:
401 - error messgae
*/
apiRouter.use(
  header('Authorization').notEmpty(),
  authController.authenticateAccount
);

/*
Response:
200 - success message
*/
apiRouter.delete(
  '/account',
  accountController.handleDelete
);

/*
Response:
200 - success message
*/
apiRouter.put(
  '/account/password',
  checkExact(
    checkSchema({
      password: { isLength: { options: { min: 8 } } },
    }, ['body'])
  ),
  accountController.handleUpdatePassword
);

/*
Response:
200 - [{ 
  id: chatmetadataId, 
  matchedUser
  isSeen, 
  updatedAt 
}]
*/
apiRouter.get(
  '/chatmetadata/:page', 
  param('page').exists().isInt().toInt(),
  appController.getChatMetadata
)

/*
Response:
200 - success message
400 - error message
*/
apiRouter.delete(
  '/chatmetadata/:chatmetadataId', 
  appController.deleteChatMetadata
)

/*
Response:
200 - success message
400 - error message
*/
apiRouter.post(
  '/chatmetadata/seen/:chatmetadataId', 
  checkExact(
    checkSchema({
      isSeen: { isBoolean: true },
    }, ['body'])
  ),
  appController.updateSeenChat
)

/*
Response:
200 - [{ 
  id: chatId, 
  isMine: boolean
  content, 
  createdAt 
}]
400 - error message
*/
apiRouter.get(
  '/chats/:matchedUserId/:page', 
  param('page').exists().isInt().toInt(),
  appController.getChats
)

/*
Response:
200 - { 
  id: chatId, 
  content, 
  createdAt 
}
400 - error message
*/
apiRouter.post(
  '/chat/:receiverId', 
  checkExact(
    checkSchema({
      content: { 
        isString: true,
        isLength: { options: { min: 1 } } 
      },
    }, ['body'])
  ),
  appController.postChat
)

apiRouter.get('/user', (req, res) => {
  //logic
})

apiRouter.post('/user', (req, res) => {
  //logic
})

apiRouter.put('/user', (req, res) => {
  //logic
})

apiRouter.post('/action', (req, res) => {
  //logic
})

apiRouter.all('*', errorController.apiNotFound);

apiRouter.use(transactionController.commitTransaction);
apiRouter.use(transactionController.abortTransaction);

apiRouter.use(errorController.validationError);

export default apiRouter;