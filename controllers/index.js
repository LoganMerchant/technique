// Create an express router
const router = require('express').Router();

// Consolidate all of the routes
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;