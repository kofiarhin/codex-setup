const mongoose = require('mongoose');
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');
const { createError, sendSuccess } = require('../utils/apiResponse');

const getProjects = asyncHandler(async (_request, response) => {
  if (mongoose.connection.readyState !== 1) {
    sendSuccess(response, {
      projects: [],
      database: 'disconnected',
    });
    return;
  }

  const projects = await Project.find().sort({ createdAt: -1 }).limit(10).lean();

  sendSuccess(response, {
    projects,
    database: 'connected',
  });
});

const createProject = asyncHandler(async (request, response) => {
  if (mongoose.connection.readyState !== 1) {
    throw createError(503, 'Database connection is not ready.');
  }

  const project = await Project.create({
    name: request.body.name,
    status: request.body.status || 'draft',
  });

  sendSuccess(response, { project }, 201);
});

module.exports = {
  createProject,
  getProjects,
};
