import { config } from 'dotenv';
config();

export const ENV_VAR = {
    RABBITMQ_URL: process.env.RABBITMQ_URL,
    ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL,
}