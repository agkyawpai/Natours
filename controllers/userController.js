const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { updatePassword } = require('./authController');
const factory = require('./../controllers/handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updateMe = catchAsync(async(req, res, next) => {

    //1) If user posted passwords throw new error
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
    }

    //2) Filtered out unwanted fields names that are not allowed to be update.
    const filteredBody = filterObj(req.body, 'name', 'email');

    //3) Update user document
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })
});

exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
        active: false
    });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

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

exports.deleteUser = factory.deleteOne(User);