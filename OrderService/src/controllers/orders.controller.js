const Orders = require("../models/Orders.model.js");
const { ApiError } = require("../middlewares/error.middleware.js");
const { ORDER_STATUS } = require("../constants/index.js");

const createOrder = async (req, res, next) => {
  try {
    const { productId } = req?.body || {};
    if (!productId) {
      throw new ApiError("productId is required", 422);
    }
    const createdOrder = await Orders.create({
      productId,
      userId: req?.user?._id,
    });
    return res.status(201).json({
      message: "Order Created",
      statusCode: 200,
      data: createdOrder,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req?.body || {};
    const orderId = req?.params?.orderId
    if (!orderId || !status || !Object.values(ORDER_STATUS)?.includes(status)) {
      throw new ApiError("Enter valid and correct value for order status", 422);
    }
    const findOrder = await Orders.findOne({
      _id: orderId,
    });

    if (!findOrder) {
      throw new ApiError("order not found with this id");
    }
    findOrder.status = status;
    findOrder.save();
    return res.status(201).json({
      message: "Order Updated",
      statusCode: 200,
      data: findOrder,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const user = req?.user;

    const orders = await Orders.find({
      ...(user && user?.role === "user" && { userId: user?._id }),
    }).lean();

    return res.status(201).json({
      message: "Order fetched",
      statusCode: 200,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getAllOrder
};
