import express, { Router } from 'express';

import { 
    renderHome, 
    renderLogin, 
    renderRegister, 
    renderProfile, 
    renderSetting 
} from '../controllers/pageController';


const pageRouter = Router();

pageRouter.use(express.static('public'));
pageRouter.use('/css', express.static(__dirname + 'public/css'));

pageRouter.get('/login', renderLogin);
pageRouter.get('/register', renderRegister);
pageRouter.get('/home', renderHome);
pageRouter.get('/profile', renderProfile);
pageRouter.get('/setting', renderSetting);

export default pageRouter;