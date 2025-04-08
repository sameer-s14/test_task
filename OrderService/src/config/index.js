import { config } from 'dotenv';
config();

export const ENV_VAR = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    RABBITMQ_URL: process.env.RABBITMQ_URL
}