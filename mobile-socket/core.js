const app = require('./app');
const events = require('./helpers/events.helper');
const authHandler = require('./middlewares/auth-handler');

const io = require('socket.io')(3001, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

function initSocketIO() {
    io.use(authHandler);
    io.on(events.connection, connection());
}

function connection() {
    return (socket) => {
        socket.join(socket.roomId);
        app.general.initEvents(io, socket);
    };
}

module.exports = {
    init: initSocketIO,
};
