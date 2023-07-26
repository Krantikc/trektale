const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const { UserController } = require('../modules/user');
const { AuthController } = require('../modules/auth');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(AuthController.register), AuthController.login);
router.post('/login', ((req, resp) => {
    passport.authenticate('local', (user, authorized, err) => {
        if (err) {
            resp.status(401).json(err);
        }
        console.log(user)
        resp.status(200).json(user);
    })(req, resp)
}), AuthController.login);
router.get('/invalidatetoken', AuthController.invalidateToken, AuthController.login);
router.get('/me', passport.authenticate('jwt', { session: false }), AuthController.login);
