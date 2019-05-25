'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Token = require('./../models/Token');

module.exports = (passport) => {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;
  opts.passReqToCallback = true;

  passport.use(new JwtStrategy(opts, async (req, jwt_payload, done) => {
    let token = req.headers.authorization.split(' ')[1], auth_token;

    auth_token = await Token.query().where('token', token).andWhere('userId', jwt_payload.userId).eager('user').first();

    if (auth_token) {
      req.token = token;
      return done(null, auth_token.user);
    } else {
      return done(null, false);
    }
  }));

}
