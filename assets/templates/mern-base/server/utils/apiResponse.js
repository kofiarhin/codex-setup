function sendSuccess(response, data, statusCode = 200) {
  response.status(statusCode).json({
    success: true,
    data,
  });
}

function sendError(response, message, statusCode = 500, details) {
  const payload = {
    success: false,
    message,
  };

  if (details) {
    payload.details = details;
  }

  response.status(statusCode).json(payload);
}

function createError(statusCode, message, details) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

module.exports = {
  createError,
  sendError,
  sendSuccess,
};
