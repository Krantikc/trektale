const express = require('express');
const userRoutes = require('./user.route');
const eventRoutes = require('./event.route');
const authRoutes = require('./auth.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/event', eventRoutes);
router.use('/user', userRoutes);

module.exports = router;
