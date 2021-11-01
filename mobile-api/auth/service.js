const helper = require('../../app/helpers/helper');
const converter = require('./converter');
const sql = require('./sql');
const bcrypt = require('bcryptjs');

const registration = {
    post: async (connection, options) => {
        let foundUser = await sql.common.findUser(connection, options.email);
        if (foundUser) {
            return helper.doom.error.emailAlreadyRegistered();
        }

        if (!helper.config.regExp.password.test(options.password)) {
            return helper.doom.error.passwordNotValid();
        }

        options.password = bcrypt.hashSync(options.password, 10);
        let userId = await sql.registration.post.addUser(connection, options);

        options.access_token = helper.token.user.accessToken(userId);
        options.refresh_token = helper.token.user.refreshToken(userId);

        await sql.registration.post.updateUser(connection, options, userId);

        let result = converter.registration.post(options);

        return {
            'success': true,
            'result': result,
        }
    }
};

const login = {
    post: async (connection, options) => {
        let user = await sql.common.findUser(connection, options.email);
        if (user === null) {
            return helper.doom.error.emailNotFound(options.email);
        }

        let incorrectPassword = !bcrypt.compareSync(options.password, user.user_password);
        if (incorrectPassword) {
            return helper.doom.error.passwordNotValid();
        }

        options.access_token = helper.token.user.accessToken(user.user_id, user.user_email);
        options.refresh_token = helper.token.user.refreshToken(user.user_id);

        await sql.login.post.updateUser(connection, user.user_id, options);

        let result = converter.login.post(options);

        return {
            "success": true,
            "result": result,
        }
    }
};

const logout = {
    post: async (connection, user) => {
        await sql.logout.post.updateUser(connection, user.id);

        return {
            "success": true,
            "result": {
                "message": "Logout successfully.",
            }
        }
    }
};

const forgotPassword = {
    put: async (connection, options) => {

        const user = await sql.findUser.get.user(connection, options.email);
        if (user) {
            const verificationCode = helper.mailer.generateVerifyCode();
            await helper.mailer.sendMail(options.email, { verificationCode });
            const restorePasswordToken = await helper.token.user.restorePasswordToken();
            await sql.verificationCode.post.saveVerificationCode(connection, verificationCode, user, restorePasswordToken);
        }

        return {
            'success': true,
            'result': {
                message: 'The letter was successfully sent',
            }
        }
    }
};

const verifyCode = {
    post: async (connection, options) => {
        const code = await sql.verificationCode.get.verificationCode(connection, options.code);
        if (!code) {
            return helper.doom.error.verificationCodeNotFound()
        }
        await helper.token.user.verifyRestorePasswordToken(code.life_time);

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
        const code = await sql.verificationCode.get.verificationCode(connection, options.code);

        if (code === null) {
            return helper.doom.error.verificationCodeNotFound();
        }
        await helper.token.user.verifyRestorePasswordToken(code.life_time);

        if (options.password !== options.passwordRepeat) {
            return helper.doom.error.passwordNotConcur();
        }

        const newPassword = bcrypt.hashSync(options.password, 10);
        await sql.forgotPassword.put.changePassword(connection, newPassword, code.user_id);

        return {
            'success': true,
            'result': {
                message: 'your password was successfully updated',
            }
        }
    }
};

module.exports = {
    registration,
    login,
    logout,
    forgotPassword,
    verifyCode,
    changePassword,
};
