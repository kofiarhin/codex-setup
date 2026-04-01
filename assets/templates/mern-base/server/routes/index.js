const express = require('express');
const healthRoutes = require('./health.routes');
const projectRoutes = require('./project.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
