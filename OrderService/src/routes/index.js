import { Router } from 'express';
import { createOrder, fetchAllOrders, upateOrderStatus } from '../controllers/index.js';
const router = Router();

router.post('/order', createOrder)
router.patch('/order/:orderId', upateOrderStatus)
router.get('/order', fetchAllOrders)

export default router