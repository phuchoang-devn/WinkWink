import { Router } from 'express';
import transactionController from "../controllers/transactionController.js";
import accountController from '../controllers/accountController.js';
import errorController from '../controllers/errorController.js';
import { checkExact, checkSchema, cookie, param, query } from 'express-validator';
import authController from '../controllers/authController.js';
import appController from '../controllers/appController.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';


const apiRouter = Router();

apiRouter.use(cookieParser());
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
apiRouter.post(
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
200 - success message
*/
apiRouter.get(
  '/logout',
  authController.handleLogout
)

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
  cookie('AuthToken').notEmpty(),
  authController.authenticateAccount
);

/*
Response:
400 - error messgae
200 - succes message
*/
apiRouter.post(
  '/ws',
  checkExact(
    checkSchema({
      conn: { isUUID: true },
    }, ['body'])
  ),
  appController.wsRegister
)

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
  matchedUserName,
  matchedUser,
  lastMessage,
  isSeen, 
  updatedAt 
}]
*/
apiRouter.get(
  '/chatmetadata/:time?', 
  param('time').optional().isISO8601(),
  appController.getChatMetadata
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
  '/chats/:matchedUserId/:chatOrder?', 
  param('chatOrder').optional().isInt().toInt(),
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

/*
Response:
200 - success message
*/
apiRouter.post(
  '/image/profile', 
  multer().single("avatar"),
  appController.uploadImage
)

/*
Response:
200 - image
400 - error message
*/
apiRouter.get(
  '/image/profile', 
  appController.getImageProfile
)


/*
Response:
200 - image
400 - error message
*/
apiRouter.get(
  '/image/chat/:matchedUserId', 
  param("matchedUserId").exists().isString(),
  appController.getImageChat
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

/*
Response:
200 - [{ 
  id, 
  fullName,
  age,
  sex,
  country,
  interests,
  language: [] 
}]
400 - error message
*/
apiRouter.get(
  "/wink",
  query("except").optional().isArray(),
  appController.findFriends
)

/*
Response:
200 - success message
400 - error message
*/
apiRouter.post(
  '/wink', 
  checkExact(
    checkSchema({
      id: { isString: true },
      isWink: { isBoolean: true } 
    }, ['body'])
  ),
  appController.handleWink
)


apiRouter.all('*', errorController.apiNotFound);

apiRouter.use(transactionController.commitTransaction);
apiRouter.use(transactionController.abortTransaction);

apiRouter.use(errorController.validationError);

export default apiRouter;