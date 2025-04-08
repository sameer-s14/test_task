import express from 'express';
import { ENV_VAR } from './config/index.js';
import { connectDB } from './config/db.js';
import orderRouter from './routes/index.js';
import { connectRabbitMQ } from './services/rabbit.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', orderRouter);

app.all('/{0,}', (_req, res) => {
    return res.status(404).json({
        statusCode: 404,
        message: "URL does not exist on this server",
    });
});

async function startServer() {
    try {
        await connectDB();
        console.log('Connected to MongoDB')
        connectRabbitMQ();
        console.log('Connected to RabbitMQ')
        app.listen(ENV_VAR.PORT, () => {
            console.log('Order Service Running on PORT', ENV_VAR.PORT)
        })
    } catch (err) {
        console.log('Error connecting db', err);
        process.exit(1)
    }
}

startServer()