const User = require('../models/users');
const Review = require('../models/reviews');

//For landing page which is sign in page
module.exports.home = function(req,res){
    return res.render('user_signin');
}

//When a user is signed in
module.exports.dashboard = async function(req,res){
    const all_users = await User.find({ _id: {$ne: req.user.id}});
    const curr_user = await User.findById(req.user.id)
    .populate({
        path: 'to_review',
        populate:[
            {path: 'from_user'},
            {path: 'to_user'}
        ]
    });
    //console.log(curr_user);
    const allReviews = await Review.find({feedback: {$ne: ""}})
    .populate([
        {
            path: 'from_user'
        },
        {
            path: 'to_user'
        }
    ]);
    const reviews_for_user = await Review.find({to_user: req.user.id})
    .populate([
        {
            path: 'from_user'
        },
        {
            path: 'to_user'
        }
    ]);
    return res.render('home',{
        all_users: all_users,
        curr_user: curr_user,
        allReviews: allReviews,
        reviews: reviews_for_user
    });
}


//render sign up page
module.exports.signup = function(req,res){
    return res.render('user_signup');
}

//When user is signed in
module.exports.createSession = async function(req,res){
    req.flash('success','Logged Successfully')
    return res.redirect('/home');   
}


//For creating a Employee
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body);
            req.flash('success','Registered Successfully')
            if(req.user.isAdmin){
                return res.redirect('/viewemployees');
            }
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log(err);
        return;
    });
}


//for logging out
module.exports.signout = function(req,res){
    req.logout(function(err) {
        if (err) {
          console.log('Error in logging out:', err);
          return res.redirect('/'); // Handle the error by redirecting to the homepage or an error page
        }
        req.flash('success','Logged Out Successfully')
        return res.redirect('/');
    });
}

//to add feedback about performance
module.exports.addFeedback = async function(req,res){
    try{
        const review = await Review.findById(req.params.id);
        const user = await User.findById(req.user.id);
        review.feedback = req.body.feedback;
        review.save();
        user.to_review.pull(review._id);
        user.save();
        req.flash('success','Review Submotted Successfully')
        return res.redirect('back');

    }catch(err){
        console.error('Error in sending feedback :',err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}