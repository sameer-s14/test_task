const axios = require("axios");
const { ApiError } = require("../middlewares/error.middleware");

const userServiceURL = "http://127.0.0.1:4000";

const verifyTokenFromUserService = async (token) => {
  try {
    const { data } = await axios.post(`${userServiceURL}/user/verify-token`, {
      token,
    });
    if (![200, 201]?.includes(data?.statusCode)) {
      throw new ApiError(data?.message || "Can not verify token");
    }
    return data;

  } catch (err) {
    throw err;
  }
};

module.exports = { verifyTokenFromUserService };
