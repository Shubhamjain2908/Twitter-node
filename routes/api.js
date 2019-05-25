'use strict';

const Auth = require('../controllers/AuthController');
const passport = require('passport');
require('../middleware/passport')(passport);
const express = require('express');
const router = express.Router();

/***********************
  User Auth Routes
***********************/
router.post('/signup', Auth.signUp);
router.post('/login', Auth.login);
router.post('/verify', Auth.verifyUser);
router.get('/logout', passport.authenticate('jwt', { session: false }), Auth.logout);
/***********************
  User Auth Routes
***********************/

module.exports = router;
