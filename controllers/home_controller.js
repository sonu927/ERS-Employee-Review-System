const User = require('../models/users');

module.exports.home = function(req,res){
    return res.render('user_signin');
}

module.exports.dashboard = function(req,res){
    return res.render('home');
}

module.exports.signup = function(req,res){
    return res.render('user_signup');
}

module.exports.createSession = function(req,res){
   
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