const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const { EventController } = require('../modules/event');
const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))


router.get('/', EventController.list);

router.get('/:eventId', EventController.getById);

router.post('/', EventController.insert);

router.put('/', EventController.update);

router.delete('/:eventId', EventController.delete);

