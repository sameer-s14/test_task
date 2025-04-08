import { ORDER_STATUS, QUEUE_NAMES } from "../constants/index.js";
import { Orders } from "../models/order.model.js";
import { publishToQueue } from "../services/rabbit.js";
import { convertToObjectId, isValidObjectId } from "../utils/index.js";

export const createOrder = async (req, res, next) => {
    try {
        const { productId } = req?.body || {};
        if (!productId) {
            throw new Error('productId is required')
        }

        const createdOrder = await Orders.create({ productId });

        await publishToQueue(QUEUE_NAMES.ORDER_CREATED, createdOrder?.toJSON());

        return res.json({
            statusCode: 200,
            message: "Order created",
            data: createdOrder
        })

    } catch (err) {
        console.log('Error in createOrder', err?.message)
        return res.json({
            statusCode: 500,
            message: err?.message
        })
    }
}

export const upateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req?.params || {};
        const isPaymentSuccess = req?.body?.isPaymentSuccess ?? false;

        if (!orderId || !isValidObjectId(orderId)) {
            throw new Error('Enter valid orderId')
        }
        const orderFound = await Orders.findOne({ _id: convertToObjectId(orderId) });
    
        if(!orderFound){
            throw new Error('Order not found with this id')
        }

        orderFound.status = isPaymentSuccess ? ORDER_STATUS.PAID : ORDER_STATUS.FAILED;

        await orderFound.save();
        // await publishToQueue(QUEUE_NAMES.ORDER_CREATED, createdOrder?.toJSON());

        return res.json({
            statusCode: 200,
            message: "Order statis updated",
        })

    } catch (err) {
        console.log('Error in createOrder', err?.message)
        return res.json({
            statusCode: 500,
            message: err?.message
        })
    }
}

export const fetchAllOrders = async (req, res, next) => {
    try {
        
        const orders = await Orders.find().sort({createdAt: 'desc'}).lean();
    
        return res.json({
            statusCode: 200,
            message: "Orders Fetched",
            orders
        })

    } catch (err) {
        console.log('Error in fetchAllOrders', err?.message)
        return res.json({
            statusCode: 500,
            message: err?.message
        })
    }
}