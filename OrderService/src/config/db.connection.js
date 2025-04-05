const mongoose = require('mongoose');
const ENV_VAR = require('.');

const connectDb =()=>{
    return mongoose.connect(ENV_VAR.MONGODB_URI);
}

module.exports = {
    connectDb,
}