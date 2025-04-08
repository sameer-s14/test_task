import axios from 'axios';
import { ENV_VAR } from '../config/index.js';

export const processPayment = async (orderData) => {
  try {
    const orderId = orderData?._id
    console.log('Processing payment for Order ID:', orderId);

    const isPaymentSuccess = Math.random() < 0.5;

    await axios.patch(`${ENV_VAR.ORDER_SERVICE_URL}/order/${orderId}`, {
      isPaymentSuccess
    });

    console.log(`Payment processing for order ${orderData._id} - Status: ${isPaymentSuccess}`);
} catch (err) {
    console.log('Payment processing failed:', err?.message);
  }
};
