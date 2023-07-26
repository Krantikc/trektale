const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../modules/user/user.controller');

const { UserController } = require('../modules/user');
const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(UserController.insert));

router.get('/', UserController.list);

router.get('/:email', UserController.getByEmail);