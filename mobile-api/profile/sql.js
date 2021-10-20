const { pg } = require('../../app/helpers/helper');

const updateUser = {
    put: async (connection, options, userId) => {
        const { email, phone, address, fullName } = options;
        let sql = [];

        sql.push('UPDATE smart_mow.accounts SET');

        if (fullName) sql.push(`user_full_name = '${fullName}',`);
        if (email) sql.push(`user_email = '${email}',`);
        if (phone) sql.push(`user_phone = '${phone}',`);
        if (address) sql.push(`user_address = '${address}',`);

        pg.deleteLastCharacterOfLastElementInArray(sql);

        sql.push(`WHERE user_id = ${userId}`);

        await connection.query(sql.join(' '));
    },
};

const updatePassword = {
    put: async (connection, password, userId) => {
        await connection.query(`
            UPDATE smart_mow.accounts
            SET user_password = $2
            WHERE user_id = $1
        `, [userId, password]);
    }
};

const findUserPassword = {
    put: async (connection, userId) => {
        const sql = await connection.query(`
            SELECT user_password
            FROM smart_mow.accounts
            WHERE user_id = $1
            LIMIT 1
        `, [userId]);
        return pg.firstResultOrNull(sql);
    }
};

module.exports = {
    updateUser,
    updatePassword,
    findUserPassword
};
