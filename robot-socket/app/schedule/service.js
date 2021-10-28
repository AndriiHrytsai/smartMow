const {events} = require('../../helpers/index');
const sql = require('./sql');

async function emitSchedule(connection, mobileIO, robotIO, data) {
    const schedule = await sql.getSchedule(connection, data.robotUUID);
    robotIO.to(data.robotUUID).emit(events.schedule, {
        days: schedule.days,
    });
}

module.exports = {
    emitSchedule,
};
