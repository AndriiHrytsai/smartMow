const { events } = require('../../helpers/index');

function onRemoteControl(socket, mobileIO, robotIO) {
    socket.on(events.control.remote_control, (data) => {
        if (data.robotUUID && data.action) {
            console.log('[Mobile] remote_control: ', data.action);
            robotIO.to(data.robotUUID).emit(events.control.remote_control, data);
        } else {
            console.log('[Mobile] remote_control, not enough data');
        }
    });
}

module.exports = {
    onRemoteControl,
};
