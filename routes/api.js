'use strict';

const passport = require('passport');
require('../middleware/passport')(passport);
const express = require('express');
const router = express.Router();

const Auth = require('../controllers/AuthController');
const User = require('../controllers/UserController');
const Tweet = require('../controllers/TweetController');


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

/***********************
  Tweet Routes
***********************/
router.post('/tweet', passport.authenticate('jwt', { session: false }), Tweet.createTweet);
router.get('/tweet/feed', passport.authenticate('jwt', { session: false }), Tweet.fetchUserFeed);
router.get('/tweets', passport.authenticate('jwt', { session: false }), Tweet.getUserTweets);
router.delete('/tweet/:id', passport.authenticate('jwt', { session: false }), Tweet.deleteTweet);
/***********************
  Tweet Routes
***********************/

module.exports = router;
