const {config} = require('../../app/helpers/helper');
const JWT = require('jsonwebtoken');

function validateAuthToken(accessToken, refreshToken) {
    try {
        let decode = JWT.verify(accessToken, config.JWT.secret.user.accessToken);
        return decode.sub;
    } catch (e) {
        if (e.name === JWT.TokenExpiredError.name) {
            // try refresh token
        } else {
            // go to login screen
        }
    }
}

module.exports = async (socket, next) => {
    let accessToken = socket.handshake.query.accessToken;
    let refreshToken = socket.handshake.query.refreshToken;

    // TODO need auth
    let userId = validateAuthToken(accessToken, refreshToken);
    socket.roomId = 1;
    socket.userId = 1;

    next();
};
