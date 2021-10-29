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
        const foundInfo = await sql.profileInfo.get.findInfo(connection, userId);
        if (foundInfo === null) {
            return helper.doom.error.accountNotFound();
        }

        const result = await converter.profileInfo.get(foundInfo);

        return {
            'success': true,
            'result': result,
        }
    }
};

const forgotPassword = {
    put: async (connection, options) => {
        const verificationCodeLength = 4;
        let verificationCode = [];

        const user = await sql.profileInfo.put.findUser(connection, options.email);
        if (user) {
            for (let i = 0; i < verificationCodeLength; i++) {
                const result = helper.awsMailer.generateRandomNumber();
                verificationCode.push(result);
            }
            verificationCode = verificationCode.join('');
            await helper.awsMailer.sendEmail(options.email, verificationCode);

            const forbiddenToken = await helper.token.user.forbiddenToken();

            await sql.verificationCode.post.saveVerificationCode(connection, verificationCode, user, forbiddenToken);
        }

        return {
            'success': true,
            'result': {
                message: 'The letter was successfully sent',
            }
        }
    }
};

const verifyUser = {
    post: async (connection, options) => {
        const code = await sql.verificationCode.get.verificationCode(connection, options.code)
        if (!code) {
            return helper.doom.error.accountNotFound()
        }
        await helper.token.user.verifyForbiddenToken(code.life_time)

        return {
            'success': true,
            'result': {
                message: 'verify is successful',
            }
        }
    }
};

const changePassword = {
    put: async (connection, options) => {

        const code = await sql.verificationCode.get.verificationCode(connection, options.code)

        if (!code) {
            return helper.doom.error.accountNotFound();
        }
        await helper.token.user.verifyForbiddenToken(code.life_time);

        if (options.password === options.passwordRepeat) {
            const newPassword = bcrypt.hashSync(options.password, 10);
            await sql.forgotPassword.put.changePassword(connection, newPassword, code.user_id);
        }

        return {
            'success': true,
            'result': {
                message: 'your password was successfully updated',
            }
        }
    }
};

module.exports = {
    updateUser,
    updatePassword,
    profileInfo,
    forgotPassword,
    verifyUser,
    changePassword
};
