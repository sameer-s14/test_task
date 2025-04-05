const {Router} = require('express');
const orderRouter = Router();
const {createOrder,updateOrderStatus,getAllOrder} = require('../controllers/orders.controller.js');
const {verifyToken} = require('../middlewares/verifyToken.js');

orderRouter.post('/',verifyToken,createOrder)
orderRouter.put('/:orderId',updateOrderStatus)
orderRouter.get('/',verifyToken,getAllOrder)  

module.exports = orderRouter