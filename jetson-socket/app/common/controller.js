const {events} = require('../../helpers/index');

let userConnected = 0;

function onConnection(socket) {
    userConnected++;
    console.log(`connection. UserId: ${socket.userId}. Total Users: ${userConnected}`);
}

function onDisconnect(socket) {
    socket.to(socket.userId).on(events.disconnect, () => {
        userConnected--;
        console.log(`disconnect. UserId: ${socket.userId}. Total Users: ${userConnected}`);
    });
}

module.exports = {
    onConnection,
    onDisconnect,
};
