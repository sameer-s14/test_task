const orderServiceURL = "http://127.0.0.1:4001"; 
const axios = require("axios");
const { ApiError } = require("../middlewares/error.middleware");

const createOrder = async (req, res, next) => {
  try {
    const token = (req?.headers?.authorization || " ")?.split(' ')[1];
    if(!token){
        throw new ApiError(401,'token not provided')
    }
    const { data } = await axios.post(
      `${orderServiceURL}/order`,
      req?.body,
      {headers:{
        Authorization: `Bearer ${token}`
      }}
    );
    return res.json(data);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const token = (req?.headers?.authorization || " ")?.split(' ')[1];
    if(!token){
        throw new ApiError(401,'token not provided')
    }
    const { data } = await axios.put(
      `${orderServiceURL}/order/${req?.params?.orderId}`,
      req?.body,
      {headers:{
        Authorization: `Bearer ${token}`
      }}
    );
    return res.json(data);

  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const token = (req?.headers?.authorization || " ")?.split(' ')[1];
    if(!token){
        throw new ApiError(401,'token not provided')
    }
    console.log('>>>>>>',token)
    const { data } = await axios.get(
      `${orderServiceURL}/order`,
      {headers:{
        Authorization: `Bearer ${token}`
      }}
    );
    return res.json(data);

  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getAllOrder,
};
