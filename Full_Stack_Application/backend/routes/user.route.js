
const { Router } = require('express');
const { passport } = require('../config/google.auth');
const { AuthMiddleware } = require('../middleware/user.authMiddleware');
const userRouter = Router();

const {
    UserRegister,
    UserLogin,
    ForgotPasswordByEmail,
    ResetUserPassword,
    googleAuthentication
} = require("../controllers/user.controller")



userRouter.post('/register', UserRegister);
userRouter.post('/login', UserLogin);
userRouter.post('/forgot-password', ForgotPasswordByEmail);
userRouter.post('/reset-password', AuthMiddleware, ResetUserPassword);

// Google OAuth
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), googleAuthentication)


module.exports = { userRouter };
