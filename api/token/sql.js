const {pg} = require('../../app/helpers/helper');

const common = {
    findUserById: async (connection, userId) => {
        const sql = await connection.query(`
            SELECT user_id,
                   user_password
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

module.exports = {
    common,
    firebase,
};
