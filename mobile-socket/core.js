const app = require('./app');
const events = require('./helpers/events.helper');
const userAuthHandler = require('./middlewares/user-auth-handler');

function init(mobileIO, robotIO) {
    mobileIO.use(userAuthHandler);
    mobileIO.on(events.common.connection, connection(mobileIO, robotIO));
}

function connection(mobileIO, robotIO) {
    return (socket) => {
        socket.join(socket.roomId);
        app.general.initEvents(socket);
        app.robot.initEvents(socket);
        app.control.initEvents(socket, mobileIO, robotIO);
        app.schedule.initEvents(socket, mobileIO, robotIO);
    };
}

module.exports = {
    init,
};
