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
    }
};

module.exports = {
    schemas,
};
