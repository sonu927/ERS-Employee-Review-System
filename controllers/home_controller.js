
module.exports.home = function(req,res){
    return res.render('user_signin');
}

module.exports.signup = function(req,res){
    return res.render('user_signup');
}