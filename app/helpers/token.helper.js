const config = require('./config.helper');
const JWT = require('jsonwebtoken');
const { promisify } = require('util')

const verifyPromise = promisify(JWT.verify);

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

    restorePasswordToken: () => {
        return JWT.sign({
            'iss': config.JWT.iss,
        }, config.JWT.secret.user.restorePasswordToken, {
            expiresIn: config.JWT.lifetime.restorePasswordToken,
        });
    },

    verifyRestorePasswordToken: async (token) => {
        await verifyPromise(token, config.JWT.secret.user.restorePasswordToken);
    }
};


module.exports = {
    user,
};
