const config = require('./config.helper');
const JWT = require('jsonwebtoken');

const user = {
    accessToken: (userId) => {
        return JWT.sign({
            'iss': config.JWT.iss,
            'sub': userId,
        }, config.JWT.secret.user.accessToken, {
            // 'expiresIn': config.JWT.lifetime.accessToken
        });
    },

    refreshToken: (userId) => {
        return JWT.sign({
            'iss': config.JWT.iss,
            'sub': userId,
        }, config.JWT.secret.user.refreshToken, {
            // 'expiresIn': config.JWT.lifetime.refreshToken
        });
    },
};

module.exports = {
    user,
};
