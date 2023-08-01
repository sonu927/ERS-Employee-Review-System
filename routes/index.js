const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

router.get('/',homeController.home);
router.get('/home',homeController.dashboard);
router.get('/signup',homeController.signup);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),homeController.createSession);
router.post('/create',homeController.create);

module.exports = router;