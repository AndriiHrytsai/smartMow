const { controller } = require('../../app/helpers/helper');
const service = require('./service');

const firebase = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.firebase.post(connection, req.options, req.user);
        });
    }
};

const sendNotification = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.sendNotification.post(connection, req.options, req.user);
        });
    }
};

const notifications = {
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.notifications.post(connection, req.options, req.user);
        });
    }
};

const notificationsByUUID = {
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            console.log(req.options);
            console.log('-------')
            return await service.notificationsByUUID.post(connection, req.options);
        });
    }
};

module.exports = {
    firebase,
    sendNotification,
    notifications,
    notificationsByUUID
};
