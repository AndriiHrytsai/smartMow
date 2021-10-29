const {pg} = require('../../../app/helpers/helper');

async function getRobotOwners(connection, robotUUID) {
    const sql = await connection.query(`
        SELECT accounts.user_id        AS id,
               accounts.firebase_token AS firebase_token
        FROM smart_mow.robot robot
                 INNER JOIN smart_mow.accounts accounts ON accounts.user_id = robot.owner_id
        WHERE robot.robot_uuid = $1
    `, [robotUUID]);

    return pg.resultOrEmptyArray(sql);
}

async function saveNotification(connection, userId, robotUUID, data) {
    let result = await connection.query(`
        INSERT
        INTO smart_mow.notification
        (owner,
         robot_uuid,
         message,
         title,
         priority)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `, [userId,
        robotUUID,
        data.message,
        data.title,
        data.priority,
    ]);
    return pg.getId(result, 'id');
}

module.exports = {
    getRobotOwners,
    saveNotification,
};
