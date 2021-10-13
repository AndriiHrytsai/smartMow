const {config} = require('../../app/helpers/helper');
const JWT = require('jsonwebtoken');

function validateAuthToken(accessToken) {
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

    return null;
}

module.exports = async (socket, next) => {
    let accessToken = socket.handshake.query.accessToken;
    let userId = validateAuthToken(accessToken);
    if (userId === null) {
        socket.disconnect();
        return;
    }

    socket.userId = userId;
    socket.roomId = userId;

    next();
};
