import amqp from 'amqplib';
import { ENV_VAR } from '../config/index.js';
import { QUEUE_NAMES } from '../constants/index.js';

let channel = null;
let connection = null;

export const connectRabbitMQ = async (retries = 5, delay = 3000) => {
    while (retries > 0) {
      try {
        connection = await amqp.connect(ENV_VAR.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAMES.ORDER_CREATED);
        console.log('Connected to RabbitMQ and queue is ready.');
        return;
      } catch (error) {
        console.log('RabbitMQ Connection Error:', error.message);
        retries--;
        if (retries === 0) {
          console.log('All retries failed. Exiting...');
          process.exit(1);
        }
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };
  

export const publishToQueue = async (queueName, data) => {
  if (!channel) {
    console.error('Cannot publish, channel is not initialized.');
    return;
  }
  try {
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    console.log(`Message sent to queue: ${queueName}`);
  } catch (error) {
    console.error('Failed to publish to queue:', error);
  }
};
