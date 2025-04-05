const express = require('express');
const orderRouter = require('./routes/index.js')
const {connectDb} = require('./config/db.connection.js')
const ENV_VAR = require('./config/index.js');
const {errorHandler} = require('./middlewares/error.middleware.js')
const app = express();

app.use(express.json());

app.use('/order',orderRouter);
app.use(errorHandler)

function startServer(){
    connectDb().then(()=>{
        app.listen(ENV_VAR.PORT,()=>{
            console.log('Order server connected successfully')
        })
    }).catch((err)=>{
        console.log('failed to connect db',err)
    })
}

startServer()