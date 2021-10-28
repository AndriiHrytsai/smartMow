const {pg} = require('../../../app/helpers/helper');

async function getSchedule(connection, robotUUID) {
    const sql = await connection.query(`
        SELECT days
        FROM smart_mow.schedule
        WHERE robot_uuid = $1
    `, [robotUUID]);

    return pg.firstResultOrNull(sql);
}

module.exports = {
    getSchedule,
};
