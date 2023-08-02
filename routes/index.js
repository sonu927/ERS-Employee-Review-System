const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const adminController = require('../controllers/admin_controller');
const passport = require('passport');

//For landing page
router.get('/',homeController.home);
//For home page when user is signed in
router.get('/home',homeController.dashboard);
//For sign up page
router.get('/signup',homeController.signup);
//To sign in a user
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),homeController.createSession);
//For creating a user
router.post('/create',homeController.create);
//For signing out
router.get('/signout',homeController.signout);
//For creating a review
router.post('/createReview',adminController.createReview);
//For adding a feedback
router.post('/addFeedback/:id',homeController.addFeedback);
//For admin to review a employee
router.post('/adminReview',adminController.adminReview);
//For editing a review
router.post('/editReview/:id',adminController.editFeedback);
//To open all employees list
router.get('/viewemployees',adminController.employeeView);
//For updating a employee details
router.post('/updateEmployee/:id',adminController.updateEmployee);
//For deleting a employee
router.get('/delete/:id',adminController.delete);
//For setting a employee as admin and removing from it
router.get('/toggleAdmin/:id',adminController.toggleAdmin);

module.exports = router;