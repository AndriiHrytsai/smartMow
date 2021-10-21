const sql = require('./sql');
const bcrypt = require('bcryptjs');
const helper = require('../../app/helpers/helper');
const converter = require('./converter');

const updateUser = {
    put: async (connection, options, user) => {
        await sql.updateUser.put.updateProfile(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'User successfully updated',
            }
        }
    }
};

const updatePassword = {
    put: async (connection, options, userId) => {
        const user = await sql.updatePassword.put.findPassword(connection, userId);
        if (user === null) {
            return helper.doom.error.accountNotFound();
        }

        const incorrectPassword = !bcrypt.compareSync(options.oldPassword, user.user_password);
        if (incorrectPassword) {
            return helper.doom.error.passwordNotValid();
        }

        const newPassword = bcrypt.hashSync(options.newPassword, 10);
        await sql.updatePassword.put.changePassword(connection, newPassword, userId);

        return {
            'success': true,
            'result': {
                message: 'User password successfully updated',
            }
        }
    }
};

const profileInfo = {
    get: async (connection, userId) => {
        const profileInfo = await sql.profileInfo.get.userInfo(connection, userId);

        const result = await converter.profileInfo.get(profileInfo);
        return {
            'success': true,
            'result': {
                'profileInfo': result
            }
        }
    }
};


module.exports = {
    updateUser,
    updatePassword,
    profileInfo
};
