import { ORDER_STATUS } from '../constants/index.js';
import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    }
}, { timestamps: true });

export const Orders = model('Order', orderSchema);
