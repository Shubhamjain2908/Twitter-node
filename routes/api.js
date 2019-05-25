'use strict';

const passport = require('passport');
require('../middleware/passport')(passport);
const express = require('express');
const router = express.Router();

const Auth = require('../controllers/AuthController');
const User = require('../controllers/UserController');


/***********************
  Auth Routes
***********************/
router.post('/signup', Auth.signUp);
router.post('/login', Auth.login);
router.post('/verify', Auth.verifyUser);
router.get('/logout', passport.authenticate('jwt', { session: false }), Auth.logout);
/***********************
  Auth Routes
***********************/

/***********************
  User Routes
***********************/
router.post('/follow', passport.authenticate('jwt', { session: false }), User.followUser);
router.post('/unfollow', passport.authenticate('jwt', { session: false }), User.unFollowUser);

/***********************
  User Routes
***********************/

module.exports = router;
