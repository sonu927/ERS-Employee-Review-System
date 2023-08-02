const express = require('express');
const app = express();
const PORT = 5000;

//Connect DB 
const db = require('./config/mongoose');

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

//setting up express-session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//make assets available to use
app.use(express.static('./assets'));

//set up express-ejs-layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract and place the css and js file from subpages into the correct position
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up ejs view 
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'ERS',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser)

//use express routes
app.use('/',require('./routes'));

app.listen(PORT,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server running on port : ${PORT}`);
});