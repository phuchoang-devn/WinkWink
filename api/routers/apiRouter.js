import { Router } from 'express';

import { 
    handleLogin, 
    handleRegister 
} from '../controllers/apiController.js';


const apiRouter = Router();

// TODO: routers - logic api 
apiRouter.post('/login', handleLogin);
apiRouter.post('/register', handleRegister);


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

export default apiRouter;