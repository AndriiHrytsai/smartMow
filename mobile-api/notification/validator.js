const Joi = require('joi');

const schemas = {
    router: {
        firebase: {
            post: Joi.object().keys({
                firebaseToken: Joi.string().required(),
            }).required(),
        },
        sendNotification: {
            post: Joi.object().keys({
                title: Joi.string().optional(),
                message: Joi.string().required(),
                priority: Joi.string().required(),
            }).required(),
        },
        notifications: {
            get: Joi.object().keys({
                page: Joi.number().positive().required(),
                limit: Joi.number().positive().optional(),
            }).required(),
        },
        robotNotifications: {
            get: Joi.object().keys({
                robotUUID: Joi.string().required(),
                page: Joi.number().positive().required(),
                limit: Joi.number().positive().optional(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
