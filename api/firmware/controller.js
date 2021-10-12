const { controller } = require('../../app/helpers/helper');
const service = require('./service');

const firmware = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.firmware.post(connection, req.options, req.user);
        });
    }
};

const firmwareVersion = {
    get: async (req, res) => {
        await controller.sendJson(res, async () => {
            return await service.firmwareVersion.get(req.options, req.user);
        });
    }
};

const checkUpdate = {
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.checkUpdate.get(connection, req.options, req.user);
        });
    }
};

module.exports = {
    firmware,
    firmwareVersion,
    checkUpdate
};
