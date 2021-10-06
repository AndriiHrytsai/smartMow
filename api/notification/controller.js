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

const robotNotifications = {
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.robotNotifications.post(connection, req.options, req.user);
        });
    }
};

module.exports = {
    firebase,
    sendNotification,
    notifications,
    robotNotifications
};
