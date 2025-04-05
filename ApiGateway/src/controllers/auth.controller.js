const axios = require("axios");

const userServiceURL = "http://127.0.0.1:4000";

const registerUser = async  (req,res,next)=>{
    try{
        const {data}  = await axios.post(`${userServiceURL}/user/signup`, req?.body);
        return res.json(data)
    }catch(err){
        console.log(err?.message);
        return next(err);
    }
}


const loginUser =async  (req,res,next)=>{
    try{
        const {data}  = await axios.post(`${userServiceURL}/user/login`, req?.body);
        return res.json(data)
    }catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    loginUser,
    registerUser,
}