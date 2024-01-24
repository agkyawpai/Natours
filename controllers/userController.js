const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'fail',  
        data: "<This route is not defined yet.>"
    });
};

exports.getAllUsers = catchAsync(async(req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        status: 'success',  
        results: users.length,
        requestedAt: req.requestTime,
        data: {
            users,
        }
});
});

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'fail',  
        data: "<This route is not defined yet.>"
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'fail',  
        data: "<This route is not defined yet.>"
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'fail',  
        data: "<This route is not defined yet.>"
    });
};