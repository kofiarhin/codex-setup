const { sendError } = require('../utils/apiResponse');

function notFound(request, response) {
  sendError(response, `Route not found: ${request.method} ${request.originalUrl}`, 404);
}

module.exports = notFound;
