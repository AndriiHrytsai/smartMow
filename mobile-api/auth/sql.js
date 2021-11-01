const { pg, config } = require('../../app/helpers/helper');

const common = {
    findUser: async (connection, email) => {
        const sql = await connection.query(`
            SELECT user_id,
                   user_password
            FROM smart_mow.accounts
            WHERE user_email = $1
            LIMIT 1
        `, [email]);

        return pg.firstResultOrNull(sql);
    }
};

const registration = {
    post: {
        addUser: async (connection, options) => {
            let result = await connection.query(`
                        INSERT
                        INTO smart_mow.accounts
                        (user_full_name,
                         user_email,
                         user_password,
                         user_address,
                         user_phone,
                         user_registration_time)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING user_id;
                `, [options.fullName,
                    options.email,
                    options.password,
                    options.address,
                    options.phone,
                    new Date()]
            );
            return pg.getId(result, 'user_id');
        },

        updateUser: async (connection, options, userId) => {
            await connection.query(`
                UPDATE smart_mow.accounts
                SET user_refresh_token = $2
                WHERE user_id = $1
            `, [userId, options.refresh_token]);
        },
    }
};

const login = {
    post: {
        updateUser: async (connection, userId, options) => {
            await connection.query(`
                UPDATE smart_mow.accounts
                SET user_status        = $2,
                    user_refresh_token = $3
                WHERE user_id = $1
            `, [userId,
                config.userStatus.login,
                options.refresh_token]);
        }
    }
};

const logout = {
    post: {
        updateUser: async (connection, userEmail) => {
            await connection.query(`
                UPDATE smart_mow.accounts
                SET user_refresh_token = NULL,
                    user_status        = $2
                WHERE user_id = $1
            `, [userEmail, config.userStatus.logout]);
        }
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

const findUser = {
    get: {
        user: async (connection, email) => {
            const sql = await connection.query(`
                SELECT user_full_name, user_id
                FROM smart_mow.accounts
                WHERE user_email = $1
            `, [email]);

            return pg.firstResultOrEmptyObject(sql);
        },
    }
};

module.exports = {
    common,
    registration,
    login,
    logout,
    verificationCode,
    forgotPassword,
    findUser,
};
