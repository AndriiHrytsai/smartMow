const {events} = require('../../helpers/index');

function onWorkArea(socket, mobileIO, robotIO) {
    socket.on(events.control.on.setWorkArea, (data) => {
        console.log('[Mobile] setWorkArea', {
            ...data,
            time: new Date(),
        });

        robotIO.to(data.robotUUID).emit(events.control.emit.sendWorkArea, {
            ...data,
            time: new Date(),
        });
    });
}

function onRestrictedArea(socket, mobileIO, robotIO) {
    socket.on(events.control.on.setRestrictedArea, (data) => {
        console.log('[Mobile] setRestrictedArea', {
            ...data,
            time: new Date(),
            even: events.control.emit.sendRestrictedArea,
        });

        robotIO.to(data.robotUUID).emit(events.control.emit.sendRestrictedArea, {
            ...data,
            time: new Date(),
        });
    });
}

module.exports = {
    onWorkArea,
    onRestrictedArea,
};
