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

    forbiddenToken: () => {
        return JWT.sign({
            'iss': config.JWT.iss,
        }, config.JWT.secret.user.forbiddenToken, {
            expiresIn: config.JWT.lifetime.forbiddenToken
        });
    },

    verifyForbiddenToken: async (token) => {
        await verifyPromise(token, config.JWT.secret.user.forbiddenToken)
    }

};


module.exports = {
    user,
};
