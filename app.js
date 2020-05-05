require('./global_constants');
const Knex = require('knex');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const promiseRouter = require('express-promise-router');
const knexConfig = require('./knexfile');
const registerApi = require('./routes/api');
const cors = require('cors');
const { Model } = require('objection');
require('./global_functions');

// Initialize knex.
const knex = Knex(knexConfig.local);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const router = promiseRouter();
const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(router)
  .set('json spaces', 2);

// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect

  // res.setHeader('Access-Control-Allow-Origin', '*'); // Select this if you want to allow all website to access your App
  const allowedOrigins = ['http://localhost:4200']; // Add whatever IP you wan't to use this application with
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request headers & Methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  res.setHeader("Access-Control-Expose-Headers", "AuthToken"); // JWT Token passed as header
  next();

});


// Register our REST API.

// Error handling. The `ValidationError` instances thrown by objection.js have a `statusCode`
// property that is sent as the status code of the response.
//
// NOTE: This is not a good error handler, this is the simplest one. See the error handing
//       recipe for a better handler: http://vincit.github.io/objection.js/#error-handling
app.use('/api', registerApi);

app.use('/', (req, res) => {
  res.statusCode = 404; //send the appropriate status code
  res.json({
    status: false,
    message: 'Sorry, API does not exist!',
    data: {},
    code: 404
  });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
  } else {
    next();
  }
});

const PORT = process.env.PORT || 8641;
app.listen(PORT, () => {
  console.log(`Twitter app listening at port ${PORT}`);
});

module.exports = app;