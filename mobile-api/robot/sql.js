const { pg } = require('../../app/helpers/helper');

const allRobots = {
    get: {
        findRobots: async (connection, options, userId) => {
            const sql = `
                SELECT id,
                       owner_id,
                       version,
                       name,
                       robot_uuid
                FROM smart_mow.robot
                WHERE owner_id = $1`;

            const pagination = pg.withPagination(sql, options.page, options.limit);
            const result = await connection.query(pagination, [userId]);

            return pg.resultOrEmptyArray(result);
        },
    }
};

const robot = {
    post: {
        findRobot: async (connection, options, userId) => {
            const sql = await connection.query(`
                SELECT id,
                       owner_id,
                       version,
                       name,
                       robot_uuid
                FROM smart_mow.robot
                WHERE robot_uuid = $1
                  AND owner_id = $2
                LIMIT 1
            `, [options.robotUUID, userId]);

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

const deleteRobot = {
        delete: async (connection, options, userId) => {
            await connection.query(`
                        DELETE
                        FROM smart_mow.robot
                        WHERE robot_uuid = $1
                          AND owner_id = $2`,
                [options.robotUUID, userId]);
        },
    }
;

module.exports = {
    allRobots,
    robot,
    deleteRobot
};
