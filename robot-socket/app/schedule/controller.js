const pg = require('../../../app/drivers/pg.driver');
const {events} = require('../../helpers/index');
const service = require('./service');

function onSchedule(socket, mobileIO, robotIO) {
    socket.on(events.schedule, (data) => {
        if (data.robotUUID === undefined) {
            console.log('[Robot] schedule, not enough data');
            return;
        }

        pg.transaction(async (connection) => {
            await service.emitSchedule(connection, mobileIO, robotIO, data);
        }).catch(console.error);
    });
}

module.exports = {
    onSchedule,
};
