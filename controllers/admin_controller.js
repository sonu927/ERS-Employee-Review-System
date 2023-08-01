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

module.exports.editFeedback = async function(req,res){
    const review = await Review.findById(req.params.id);
    review.feedback = req.body.feedback;
    review.save();
    return res.redirect('back');
}

module.exports.employeeView = async function(req,res){
    const all_user = await User.find({_id: {$ne: req.user.id}});

    return res.render('allemployees',{
        all_user: all_user
    });
}

module.exports.updateEmployee = async function(req,res){
    const employee = await User.findById(req.params.id);
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.password = req.body.password;
    employee.save();
    return res.redirect('back');
}

module.exports.delete = async function(req,res){
    const employee = await User.findById(req.params.id);

    const deleteResult = await Review.deleteMany({
        $or: [{ from_user: employee.id }, { to_user: employee.id }]
    });

    employee.deleteOne();
    return res.redirect('back');
}

module.exports.toggleAdmin = async function(req,res){
    const employee = await User.findById(req.params.id);

    if(employee.isAdmin){
        employee.isAdmin = false;
    }else{
        employee.isAdmin = true;
    }

    employee.save();
    return res.redirect('back');
}