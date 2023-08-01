const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async function(req, email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          req.flash('success', 'Invalid Username/password');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        req.flash('error', err.message); // Access the error message using err.message
        return done(err);
      }
    }
  )
);



//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        console.log('Error in finding the user');
        return done(err);
    });
});

//check if the user is authenticated 
passport.checkAuthentication = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  //if user is not signed in
  return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    //res.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;