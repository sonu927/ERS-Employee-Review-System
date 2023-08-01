const User = require('../models/users');
const Review = require('../models/reviews');

module.exports.createReview = async function(req,res){
    const review = await Review.create({
        from_user: req.body.reviewer,
        to_user: req.body.recipient
    });

    let reviewer = await User.findById(req.body.reviewer);
    reviewer.to_review.push(review);
    reviewer.save();
    return res.redirect('back');
}

module.exports.adminReview = async function(req,res){
    const review = await Review.create({
        from_user: req.user.id,
        to_user: req.body.recipient,
        feedback: req.body.feedback
    });
    return res.redirect('back');
}