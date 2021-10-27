const { pg } = require('../../app/helpers/helper');

const updateUser = {
    put: {
        updateProfile: async (connection, options, userId) => {
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
        }
    },
};

const updatePassword = {
    put: {
        findPassword: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT user_password
                FROM smart_mow.accounts
                WHERE user_id = $1
                LIMIT 1
            `, [userId]);
            return pg.firstResultOrNull(sql);
        },
        changePassword: async (connection, password, userId) => {
            await connection.query(`
                UPDATE smart_mow.accounts
                SET user_password = $2
                WHERE user_id = $1
            `, [userId, password]);
        }
    }
};

const profileInfo = {
    get: {
        findInfo: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT user_full_name,
                       user_phone,
                       user_address,
                       user_email
                FROM smart_mow.accounts
                WHERE user_id = $1
            `, [userId]);

            return pg.firstResultOrEmptyObject(sql);
        }
    },
    put: {
        findUser: async (connection, email) => {
            const sql = await connection.query(`
                SELECT user_full_name, user_id
                FROM smart_mow.accounts
                WHERE user_email = $1
            `, [email]);

            return pg.firstResultOrEmptyObject(sql);
        },
    }
};

const verificationCode = {
    post: {
        saveVerificationCode: async (connection, code, user, forbiddenToken) => {
            await connection.query(`
                INSERT
                INTO smart_mow.verification
                    (code, user_id, life_time)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id)
                    DO UPDATE
                    SET code      = EXCLUDED.code,
                        user_id   = EXCLUDED.user_id,
                        life_time = EXCLUDED.life_time
            `, [code, user.user_id, forbiddenToken])
        },
    },
    get: {
        verificationCode: async (connection, code) => {
            const sql = await connection.query(`
                SELECT code, life_time, user_id
                FROM smart_mow.verification
                WHERE code = $1
            `, [code]);
            return pg.firstResultOrEmptyObject(sql);
        }
    }
};

const forgotPassword = {
    put: {
        changePassword: async (connection, password, userId) => {
            await connection.query(`
                UPDATE smart_mow.accounts
                SET user_password = $2
                WHERE user_id = $1
            `, [userId, password]);
        }
    }
};


module.exports = {
    updateUser,
    updatePassword,
    profileInfo,
    verificationCode,
    forgotPassword

};
