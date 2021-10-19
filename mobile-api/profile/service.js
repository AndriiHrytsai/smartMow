const sql = require('./sql');
const bcrypt = require('bcryptjs');


const updateUser = {
    put: async (connection, options, user) => {

        await sql.updateUser.put(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'User successfully updated',
            }
        }
    }
};

const updatePassword = {
    put: async (connection, options, user) => {
        const password = bcrypt.hashSync(options.password, 10);

        await sql.updatePassword.put(connection, password, user.id);

        return {
            'success': true,
            'result': {
                message: 'User password successfully updated',
            }
        }
    }
};

module.exports = {
    updateUser,
    updatePassword
};
