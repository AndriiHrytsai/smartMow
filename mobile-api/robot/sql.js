const {pg} = require('../../app/helpers/helper');

const createRobot = {
    post: {
        findRobot: async (connection, options) => {
            const sql = await connection.query(`
                SELECT id,
                       owner_id,
                       version,
                       name,
                       robot_uuid
                FROM smart_mow.robot
                WHERE robot_uuid = $1
                LIMIT 1
            `, [options.robotUUID]);

            return pg.firstResultOrNull(sql);
        },
        addRobot: async (connection, options, userId) => {
            await connection.query(`
                INSERT
                INTO smart_mow.robot
                (owner_id,
                 name,
                 robot_uuid,
                 version)
                VALUES ($1, $2, $3, $4)
            `, [
                userId,
                options.robotName,
                options.robotUUID,
                options.robotVersion,
            ]);
        },
    }
};

module.exports = {
    createRobot,
};
