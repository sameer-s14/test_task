const {config} = require('dotenv') ;

config()

const ENV_VAR = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}

module.exports = ENV_VAR;