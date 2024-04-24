import { Router } from 'express';

import { 
    handleLogin, 
    handleRegister 
} from '../controllers/apiController';


const apiRouter = Router();

// TODO: routers - logic api 
apiRouter.post('/login', handleLogin);
apiRouter.post('/register', handleRegister);


export default apiRouter;