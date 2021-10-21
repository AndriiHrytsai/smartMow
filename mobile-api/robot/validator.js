const {doom} = require('../../app/helpers/helper');
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
                days: Joi.string().required(),
                robotId: Joi.number().required(),
            }).required(),
            get: Joi.object().keys({
                robotId: Joi.number().required(),
            }).required(),
        },
    },
    validator: {
        checkDays(req, res, next) {
            const days = req.options.days.split(',').map(value => parseInt(value, null));
            const {error} = Joi.array().items(Joi.number().required().min(1).max(7)).required().validate(days);
            if (error) {
                return doom.error.validation(res, error);
            }

            req.options.days = days;
            next();
        }
    }
};

module.exports = {
    schemas,
};
