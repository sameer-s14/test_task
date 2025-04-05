const {Router} = require('express');
const baseRouter = Router();
const { userRouter } = require('./user.routes.js');
const orderRouter = require('./order.routes.js');

baseRouter.use('/user',userRouter)
baseRouter.use('/order',orderRouter)

module.exports = baseRouter