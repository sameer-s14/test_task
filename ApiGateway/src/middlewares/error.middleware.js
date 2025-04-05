class ApiError{
    constructor(message, statusCode = 500){
        this.message = message;
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req,res,next) => {
    return res.json({
        statusCode: err?.statusCode || 500,
        message: err?.message || 'internal server error'
    })
}
module.exports= {ApiError,errorHandler}