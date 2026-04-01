const { sendError } = require('../utils/apiResponse');

function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  sendError(response, error.message || 'Internal server error.', statusCode, error.details);
}

module.exports = errorHandler;
