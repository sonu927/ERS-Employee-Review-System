const User = require('../models/users');
const Review = require('../models/reviews');


//For assigning review of a employee to other employee 
module.exports.createReview = async function(req,res){
    const review = await Review.create({
        from_user: req.body.reviewer,
        to_user: req.body.recipient
    });

    let reviewer = await User.findById(req.body.reviewer);
    reviewer.to_review.push(review);
    reviewer.save();
    req.flash('success','Review Assigned');
    return res.redirect('back');
}

//For admin reviewing a employee
module.exports.adminReview = async function(req,res){
    const review = await Review.create({
        from_user: req.user.id,
        to_user: req.body.recipient,
        feedback: req.body.feedback
    });
    req.flash('success','Review Added Successfully');
    return res.redirect('back');
}


//For editing a review only for admin
module.exports.editFeedback = async function(req,res){
    const review = await Review.findById(req.params.id);
    review.feedback = req.body.feedback;
    review.save();
    req.flash('success','Feedback Updated Successfully');
    return res.redirect('back');
}

//For opening List of all employees
module.exports.employeeView = async function(req,res){
    const all_user = await User.find({_id: {$ne: req.user.id}});

    return res.render('allemployees',{
        all_user: all_user
    });
}

//For updating a employee
module.exports.updateEmployee = async function(req,res){
    const employee = await User.findById(req.params.id);
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.password = req.body.password;
    employee.save();
    req.flash('success','Employee Updated Successfully');
    return res.redirect('back');
}

//For deleting a employee
module.exports.delete = async function(req,res){
    const employee = await User.findById(req.params.id);

    const deleteResult = await Review.deleteMany({
        $or: [{ from_user: employee.id }, { to_user: employee.id }]
    });

    employee.deleteOne();
    req.flash('success','Employee Deleted Successfully');
    return res.redirect('back');
}


//For setting a employee as a admin or remove from admin
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