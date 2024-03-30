import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

// router object
const router = express.Router();

// routing
//Register
router.post('/register', registerController);

//login || POST,
router.post('/login', loginController);

// forgot password || POST
router.post("/forgot-password", forgotPasswordController)

// test protected route
router.get('/test', requireSignIn, isAdmin, testController);

// protected User route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

// protected Admin route auth admin
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})


export default router;