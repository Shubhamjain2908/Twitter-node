
pe = require('parse-error'); // parses error so you can read error message and handle them accordingly

//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/

to = function (promise) {
  return promise
    .then(data => {
      return [null, data];
    }).catch(err =>
      [pe(err)]
    );
}

asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}

// Response handlers
successResponse = function (res, code, data, message) {
  res.statusCode = code;
  return res.status(code || 200).json({
    success: true,
    data,
    code,
    message
  })
}

okResponse = function (res, data, message) {
  res.statusCode = 200;
  if (!message) {
    message = "";
  }
  return successResponse(res, 200, data, message);
}

createdResponse = function (res, data, message) {
  res.statusCode = 201;
  if (!message) {
    message = "";
  }
  return successResponse(res, 201, data, message);
}

errorResponse = function (res, data, message, code) {
  res.statusCode = code;
  return res.json({
    success: false,
    code,
    data,
    message
  })
}

badRequestError = function (res, message) {
  res.statusCode = 406;
  return res.json({
    success: false,
    code: 406,
    message: message
  })
}

unverifiedError = function (res, message) {
  res.statusCode = 403;
  return res.json({
    success: false,
    code: 403,
    message: message
  })
}

notFoundError = function (res, message) {
  res.statusCode = 404;
  return res.json({
    success: false,
    code: 404,
    message: message
  })
}

noContentResponse = function (res, message) {
  return successResponse(res, 204, {}, message);
}

ReE = function (res, err, code) {
  res.statusCode = code; // Error Web Response
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({
    success: false,
    message: err,
    code: code
  });
}

// The error returned by this function is handled in the error handler middleware in app.js.
createStatusCodeError = function (statusCode, message) {
  return Object.assign(new Error(), {
    statusCode,
    message,
  });
}

// The error returned by this function is handled in the error handler middleware in app.js.
statusCodeError = function createStatusCodeError(statusCode) {
  return Object.assign(new Error(), {
    statusCode
  });
}