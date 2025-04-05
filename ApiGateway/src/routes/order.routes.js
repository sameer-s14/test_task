const {Router} = require('express');
const { createOrder ,getAllOrder,updateOrderStatus} = require('../controllers/orders.controller');
const orderRouter = Router();

orderRouter.post('/',createOrder)
orderRouter.put('/:orderId',updateOrderStatus)
orderRouter.get('/',getAllOrder)  

module.exports = orderRouter