const app = require('./app');
const events = require('./helpers/events.helper');
const robotAuthHandler = require('./middlewares/robot-auth-handler');

function init(mobileIO, robotIO) {
    robotIO.use(robotAuthHandler);
    robotIO.on(events.common.connection, connection(mobileIO, robotIO));
}

function connection(mobileIO, robotIO) {
    return (socket) => {
        socket.join(socket.roomId);
        app.general.initEvents(socket);
    };
}

module.exports = {
    init,
};
