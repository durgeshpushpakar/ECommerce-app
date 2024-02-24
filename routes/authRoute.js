import express from 'express';
import {registerController, loginController} from '../controller/authController.js';

// router object
const router= express.Router();

// routing
//Register
router.post('/register', registerController);

//login || POST
router.post('/login', loginController);
 
export default router;