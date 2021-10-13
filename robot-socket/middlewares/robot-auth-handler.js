module.exports = async (socket, next) => {
    let robotUUID = socket.handshake.query.robotUUID;
    if (robotUUID === null) {
        socket.disconnect();
        return;
    }

    socket.roomId = robotUUID;
    socket.robotId = robotUUID;

    next();
};
