const Joi = require('joi');

const schemas = {
    router: {
        allRobots: {
            get: Joi.object().keys({
                page: Joi.number().positive().required(),
                limit: Joi.number().positive().optional(),
            }).required(),
        },
        robot: {
            post: Joi.object().keys({
                robotName: Joi.string().required(),
                robotUUID: Joi.string().required(),
                robotVersion: Joi.number().positive().required(),
            }).required(),
        },
        deleteRobot: {
            delete: Joi.object().keys({
                robotUUID: Joi.string().required(),
            }).required(),
        },
        schedule: {
            put: Joi.object().keys({
                days: Joi.array().items(Joi.number().required().min(1).max(7)).required(),
                robotId: Joi.number().required(),
            }).required(),
        },
        workDays: {
            get: Joi.object().keys({
                robotId: Joi.number().required(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
