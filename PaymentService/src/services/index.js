import amqp from 'amqplib';
import { processPayment } from './payment.service.js';
import { QUEUE_NAMES } from '../constants/index.js';
import { ENV_VAR } from '../config/index.js';

export const consumeRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(ENV_VAR.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAMES.ORDER_CREATED);

    console.log('Payment Service connected');

    channel.consume(QUEUE_NAMES.ORDER_CREATED, async (msg) => {
      const orderData = JSON.parse(msg.content.toString());
      console.log('Received order for payment processing:', orderData);

      await processPayment(orderData);

      channel.ack(msg);
    });

  } catch (error) {
    console.error('Error in Payment Service RabbitMQ connection:', error);
  }
};
