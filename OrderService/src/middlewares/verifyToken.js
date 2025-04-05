const {ApiError} = require('../middlewares/error.middleware.js');
const { verifyTokenFromUserService } = require("../utils/index.js");
    
const verifyToken = async  (req,res,next)=>{
    try{
        const token = (req?.headers?.Authorization || req?.headers?.authorization || " ")?.split(' ')[1];
        console.log(req?.headers);
        if(!token){
            throw new ApiError(401,'token not provided')
        }
        const {data}  = await verifyTokenFromUserService(token);
        req.user = data;
        return next()
    }catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    verifyToken
}