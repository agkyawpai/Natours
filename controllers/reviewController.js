const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');

exports.createTourUserIds = (req, res, next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getAllReviews = catchAsync(async(req, res, next) => {
    let filter = {};
    if(req.params.tourId) filter = { tour: req.params.tourId };
    
    const reviews = await Review.find(filter);
    
    res.status(200).json({
        status: 'success',
        data: {
            reviews
        }
    });
});

exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);