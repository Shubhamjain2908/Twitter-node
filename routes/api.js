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
router.get('/logout', passport.authenticate('jwt', { session: false }), Auth.logout);
/***********************
  Auth Routes
***********************/

/***********************
  User Routes
***********************/
router.post('/follow', passport.authenticate('jwt', { session: false }), User.followUser);
router.post('/unfollow', passport.authenticate('jwt', { session: false }), User.unFollowUser);
router.get('/followers', passport.authenticate('jwt', { session: false }), User.getFollowers);
router.get('/followed-user', passport.authenticate('jwt', { session: false }), User.getFollowedUser);
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

router.post('/tweet/like', passport.authenticate('jwt', { session: false }), Tweet.likeTweet);
router.post('/tweet/unlike', passport.authenticate('jwt', { session: false }), Tweet.unLikeTweet);

router.post('/retweet', passport.authenticate('jwt', { session: false }), Tweet.reTweet);
router.post('/undoretweet', passport.authenticate('jwt', { session: false }), Tweet.undoRetweet);

router.post('/tweet/reply/:id', passport.authenticate('jwt', { session: false }), Tweet.createTweet);

/***********************
  Tweet Routes
***********************/

module.exports = router;
