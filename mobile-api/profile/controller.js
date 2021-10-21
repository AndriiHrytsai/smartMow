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

module.exports = {
    updateUser,
    updatePassword,
    profileInfo
};
