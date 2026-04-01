const { validationResult } = require('express-validator');
const { sendError } = require('../utils/apiResponse');

function validateRequest(request, response, next) {
  const validation = validationResult(request);

  if (validation.isEmpty()) {
    next();
    return;
  }

  sendError(response, 'Validation failed.', 422, validation.array());
}

module.exports = validateRequest;
