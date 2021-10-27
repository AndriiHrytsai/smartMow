const { controller } = require('../../app/helpers/helper');
const service = require('./service');

const updateUser = {
    put: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.updateUser.put(connection, req.options, req.user);
        });
    }
};

const updatePassword = {
    put: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.updatePassword.put(connection, req.options, req.user.id);
        });
    }
};

const profileInfo = {
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.profileInfo.get(connection, req.user.id);
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

const verifyUser = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.verifyUser.post(connection, req.options);
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
    updateUser,
    updatePassword,
    profileInfo,
    forgotPassword,
    verifyUser,
    changePassword
};
