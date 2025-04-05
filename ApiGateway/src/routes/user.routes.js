const {Router} = require('express');
const { registerUser,loginUser } = require('../controllers/auth.controller');
const userRouter = Router();

userRouter.post('/signup',registerUser)
userRouter.post('/login',loginUser);

module.exports = {userRouter};