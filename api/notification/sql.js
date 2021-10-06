const { pg } = require('../../app/helpers/helper');
const helper = require('../../app/helpers/helper');


const common = {
    findUserById: async (connection, userId) => {
        const sql = await connection.query(`
            SELECT user_id,
                   user_password,
                   firebase_token
            FROM smart_mow.accounts
            WHERE user_id = $1
            LIMIT 1
        `, [userId]);

        return pg.firstResultOrNull(sql);
    }
};

const firebase = {
    post: {
        addFirebaseToken: async (connection, options, userId) => {
            await connection.query(`
                UPDATE smart_mow.accounts
                SET firebase_token = $2
                WHERE user_id = $1
            `, [userId, options.firebaseToken]);
        },
    }
};

const sendNotification = {
    post: {
        saveNotification: async (connection, options, userId) => {
            let result = await connection.query(`
                INSERT
                INTO smart_mow.notification
                (owner,
                 message,
                 tittle,
                 priority)
                VALUES ($1, $2, $3, $4)
                RETURNING id;
            `, [userId,
                options.message,
                options.tittle,
                options.priority,
            ]);
            return pg.getId(result, 'id');
        },
    }
};

const notifications = {
    get: {
        findAllNotification: async (connection, options, userId) => {
            const sql = `
                SELECT id,
                       owner,
                       message,
                       date,
                       priority,
                       tittle
                FROM smart_mow.notification
                WHERE owner = $1
                ORDER BY date DESC`

            const pagination = pg.withPagination(sql, options.page, options.limit);
            const result = await connection.query(pagination, [userId]);

            return pg.resultOrEmptyArray(result);
        }
    }
};

const robotNotifications = {
    get: {
        findRobotNotifications: async (connection, options, userId) => {
            const sql = `
                SELECT id,
                       owner,
                       message,
                       date,
                       priority,
                       tittle
                FROM smart_mow.notification
                WHERE robot_uuid = $1
                  AND owner = $2
                ORDER BY date DESC`

            const pagination = pg.withPagination(sql, options.page, options.limit);
            const result = await connection.query(pagination, [options.robotUUID, userId]);

            return pg.resultOrEmptyArray(result);
        }
    }
};

module.exports = {
    common,
    firebase,
    sendNotification,
    notifications,
    robotNotifications
};
