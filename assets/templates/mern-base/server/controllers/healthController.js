const mongoose = require('mongoose');
const { sendSuccess } = require('../utils/apiResponse');

function getHealth(_request, response) {
  sendSuccess(response, {
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Number(process.uptime().toFixed(2)),
  });
}

module.exports = {
  getHealth,
};
