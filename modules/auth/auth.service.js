const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class AuthService {
    generateToken(user) {
        // user.exp = config.tokenExpiration;
        return jwt.sign(user, config.jwtSecret, {expiresIn: config.tokenExpiration});
    }

    invalidateToken(user) {

    }
}

module.exports = new AuthService();


