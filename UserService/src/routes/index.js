const {Router} = require('express');
const userRouter = Router();
const {registerUser,loginUser,verifyToken} = require('../controllers/auth.controller.js');

userRouter.post('/signup',registerUser)
userRouter.post('/login',loginUser);
userRouter.post('/verify-token',verifyToken);


module.exports = userRouter