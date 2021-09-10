const {pg, config} = require('../../app/helpers/helper');

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
                         user_model_no,
                         user_uuid,
                         user_registration_time)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING user_id;
                `, [options.fullName,
                    options.email,
                    options.password,
                    options.address,
                    options.phone,
                    options.modelNo,
                    options.uuid,
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

module.exports = {
    common,
    registration,
    login,
    logout,
};
