const express = require('express');
const baseRouter = require('./routes/index.js')
const ENV_VAR = require('./config/index.js');
const {errorHandler} = require('./middlewares/error.middleware.js')
const app = express();

app.use(express.json());

app.use('/',baseRouter);

// app.use('/*',(req,res)=>{
//     return res.status(404).json({
//         message: "not found on this server"
//     });
// })

app.use(errorHandler)

app.listen(ENV_VAR.PORT,()=>{
    console.log('Gateway server connected successfully')
})