const User = require('../models/users');
const Review = require('../models/reviews');

module.exports.home = function(req,res){
    return res.render('user_signin');
}

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
    const allReviews = await Review.find({})
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
        allReviews: allReviews
    });
}

module.exports.signup = function(req,res){
    return res.render('user_signup');
}

module.exports.createSession = async function(req,res){
    
    return res.redirect('/home');
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body);
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log(err);
        return;
    });
}

module.exports.signout = function(req,res){
    req.logout(function(err) {
        if (err) {
          console.log('Error in logging out:', err);
          return res.redirect('/'); // Handle the error by redirecting to the homepage or an error page
        }
        return res.redirect('/');
    });
}

module.exports.addFeedback = async function(req,res){
    try{
        const review = await Review.findById(req.params.id);
        const user = await User.findById(req.user.id);
        review.feedback = req.body.feedback;
        review.save();
        user.to_review.pull(review._id);
        user.save();
        return res.redirect('back');

    }catch(err){
        console.error('Error in sending feedback :',err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}