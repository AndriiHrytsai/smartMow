const { pg } = require('../../app/helpers/helper');

const common = {
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
};

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
    },

    delete: {
        deleteRobot: async (connection, options, userId) => {
            await connection.query(`
                        DELETE
                        FROM smart_mow.robot
                        WHERE robot_uuid = $1
                          AND owner_id = $2`,
                [options.robotUUID, userId]);
        }
    },
};

const schedule = {
    put: {
        addSchedule: async (connection, options) => {
            await connection.query(`
                INSERT
                INTO smart_mow.schedule
                    (days, robot_id)
                VALUES ($1, $2)
                ON CONFLICT (robot_id)
                    DO UPDATE
                    SET days     = EXCLUDED.days,
                        robot_id = EXCLUDED.robot_id
            `, [options.days, options.robotId])
        }
    },

    get: {
        findSchedule: async (connection, options) => {
                let sql = await connection.query(`
                    SELECT days
                    FROM smart_mow.schedule
                    WHERE robot_id = $1
                    LIMIT 1
                `, [options.robotId]);
                return pg.firstResultOrNull(sql);
            }
    }
};

module.exports = {
    common,
    allRobots,
    robot,
    schedule,
};
