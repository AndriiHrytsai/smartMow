const {events} = require('../../helpers/index');

function onSchedule(socket, mobileIO, robotIO) {
    socket.on(events.schedule, (data) => {
        if (data.robotUUID) {
            console.log('[Mobile] schedule: ', data.days);
            robotIO.to(data.robotUUID).emit(events.schedule, data);
        } else {
            console.log('[Mobile] schedule, not enough data');
        }
    });
}

module.exports = {
    onSchedule,
};
