const { controller } = require('../../app/helpers/helper');
const { StatusCodes } = require('http-status-codes');
const service = require('./service');

const registration = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.registration.post(connection, req.options);
        }, StatusCodes.CREATED);
    }
};

const login = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.login.post(connection, req.options);
        });
    }
};

const logout = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.logout.post(connection, req.user);
        });
    }
};

const forgotPassword = {
    put: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.forgotPassword.put(connection, req.options);
        });
    }
};

const verifyCode = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.verifyCode.post(connection, req.options);
        });
    }
};

const changePassword = {
    put: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.changePassword.put(connection, req.options);
        });
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
