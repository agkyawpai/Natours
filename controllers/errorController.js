const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.keyValue.name;  //Not the same as it's shown in lecture becuz the api changed i guess
    const message = `Duplicate field : '${value}'. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join(' ')}`;
    return new AppError(message, 400);
} 

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    // Programming or other unknown error: don't leak error details
    } else {
        // Log error
        console.error('Error', err);

        // Sending generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!!'
        });
    }
    }

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || '500';
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if(process.env.NODE_ENV === 'production') {
        let error = {...err};

        if(err.name === 'CastError') error = handleCastErrorDB(error);
        if(err.code === 11000) error = handleDuplicateFieldsDB(error);
        if(err.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(error, res);
    }   
}