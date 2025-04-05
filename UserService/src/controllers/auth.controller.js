const User = require("../models/User.model");
const {ApiError} = require('../middlewares/error.middleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV_VAR = require('../config/index.js')
const registerUser =async  (req,res,next)=>{
    try{
        const {email,password,username,role} = req?.body || {   };
        if(!email || !password || !username || !role){
            throw new ApiError('all fields are required',422)
        }
        const userExists = await User.findOne({email});
        if(userExists){
            throw new ApiError('User already exists',409)
        }
        const hashPass = await bcrypt.hash(password,10);
        await User.create({email, password: hashPass,username});
        return res.status(201).json({
            message: 'User registered successfully',
            statusCode: 200,
        })
    }catch(err){
        console.log(err);
        return next(err);
    }
}


const loginUser = async (req,res,next)=>{
    try{
        const {email,password} = req?.body || { };

        if(!email || !password ){
            throw new ApiError('all fields are required',422)
        }
        const user = await User.findOne({email: email});
        if(!user){
            throw new ApiError('User does not exist',401)
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new ApiError('Invalid credentials',401)
        }
        const token = jwt.sign({
            _id: user?._id,
            role: user?.role
        },ENV_VAR.JWT_SECRET);
        return res.status(200).json({
            message: "User login successfully",
            statusCode: 200,
            data:{
                token
            }
        })
    }catch(err){
        console.log(err);
        return next(err);
    }
}


const verifyToken = async (req,res,next)=>{
    try{
        const token = req?.body?.token;

        if(!token){
            throw new ApiError('all fields are required',422)
        }
        const payload = jwt.verify(token,ENV_VAR.JWT_SECRET);

        const user = await User.findOne({_id: payload?._id});
        if(!user){
            throw new ApiError('User does not exist',401)
        }
      
        return res.status(200).json({
            message: "User login successfully",
            statusCode: 200,
            data:user
        })
    }catch(err){
        console.log(err);
        return next(err);
    }
}

module.exports = {
    loginUser,
    registerUser,
    verifyToken
}