'use strict';

const User = require('./../models/User');
const Token = require('../models/Token');
const validator = require('validator');

const signUp = async (req, res) => {

  let data = req.body;

  if (data.isVerified) {
    delete data.isVerified;
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  data.verificationCode = otp;

  let err, inserted_user;
  [err, inserted_user] = await to(User.query().insertAndFetch(data));
  if (err) return badRequestError(res, err.message);

  let auth_token = await inserted_user.getJWT();

  let inserted_token;
  [err, inserted_token] = await to(Token.query().insertAndFetch({
    userId: inserted_user.id,
    token: auth_token
  }));
  if (err) return ReE(res, err, 422);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('AuthToken', auth_token)

  // delete inserted_user.verificationCode; // For testing purpose we are not deleting the verification code while signup

  // Before returning response we will send an Email to the register user with OTP on it.

  return createdResponse(res, {
    ...inserted_user
  }, "Your account has been created successfully. Please verify your registered email id to continue.");
}

const login = async (req, res) => {

  let err, user;
  const data = req.body;
  const loginType = data.loginType;   // '0' => email

  if (!data.password) {
    return badRequestError(res, "Please enter password");
  }

  if (loginType == 0) {

    if (!data.email) {
      return badRequestError(res, "Please enter email");
    }
    if (!validator.isEmail(data.email)) {
      return badRequestError(res, "Please enter a valid email id");
    }

    [err, user] = await to(User.query().where('email', data.email).first());
    if (!user) {
      return badRequestError(res, 'Email id is not registered.');
    }

  } else {

    if (!data.username) {
      return badRequestError(res, "Please enter username");
    }
    if (!validator.isAlphanumeric(data.username)) {
      return badRequestError(res, "Please enter a valid username");
    }
    [err, user] = await to(User.query().where('username', data.username).first());
    if (!user) {
      return badRequestError(res, 'Username is not registered.');
    }
  }

  if (!await user.comparePassword(data.password)) {
    return badRequestError(res, 'Please enter valid credentials.');
  }

  if (!user.isVerified) {
    return unverifiedError(res, 'Please verify your account to continue to the application.');
  }

  let token, auth_token = await user.getJWT();
  [err, token] = await to(Token.query().insertAndFetch({
    userId: user.id,
    token: auth_token
  }));
  if (!err) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('AuthToken', auth_token)
  }

  return okResponse(res, {
    ...user.toJSON(),
  }, "Login Successful");
}

const verifyUser = async (req, res) => {
  const body = req.body;
  let verificationCode = body.verificationCode;
  let email = body.email;

  if (!verificationCode) {
    return badRequestError(res, 'The request expects an OTP');
  }
  if (!email) {
    return badRequestError(res, 'The request expects an email');
  }

  const userExists = await User.query().skipUndefined().where('email', email).first();
  if (!userExists) return badRequestError(res, 'No user exists with this emai.');

  if (userExists.isVerified) {
    return errorResponse(res, null, 'User is already verified', 409);
  }

  // For security reasons, limit the relations that can be fetched.
  const user = await User.query().skipUndefined().where('email', email).where('verificationCode', verificationCode).first();

  if (user) {
    let updated = await User.query().patch({
      isVerified: true,
      verificationCode: null
    }).where('email', email);
  } else {
    return badRequestError(res, 'The OTP is invalid');
  }
  return okResponse(res, null, "Verified successfully");
}

const logout = async (req, res) => {
  await Token.query().delete().where('token', req.token).where('userId', req.user.id);
  return noContentResponse(res);
}


module.exports = {
  signUp,
  login,
  verifyUser,
  logout
}
