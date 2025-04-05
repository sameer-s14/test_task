const mongoose = require('mongoose');
const { ORDER_STATUS } = require('../constants');

const OrderSchema = mongoose.Schema({
    productId: {
        type: String,
        required:true
    },
    userId: {
        type: String,
        required: true,
    },
    isPaymentDone: {
        type: Boolean,
        required:true,
        default: false
    },
    status: {   
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.INITIATED
    }
},{
    timestamps: true
});

const Orders = mongoose.model('orders',OrderSchema);

module.exports = Orders;