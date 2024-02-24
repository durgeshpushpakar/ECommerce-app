import express from 'express';
import {registerController, loginController, testController} from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

// router object
const router= express.Router();

// routing
//Register
router.post('/register', registerController);

//login || POST
router.post('/login', loginController);

// test protected route
router.get('/test', requireSignIn, isAdmin, testController);

 
export default router;