const express = require('express');
const { body } = require('express-validator');
const { createProject, getProjects } = require('../controllers/projectController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', getProjects);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Project name is required.'),
    body('status')
      .optional()
      .isIn(['draft', 'active', 'archived'])
      .withMessage('Status must be draft, active, or archived.'),
  ],
  validateRequest,
  createProject,
);

module.exports = router;
