const Joi = require('joi');

const schemas = {
    router: {
        robot: {
            post: Joi.object().keys({
                robotName: Joi.string().required(),
                robotUUID: Joi.string().required(),
                robotVersion: Joi.number().positive().required(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
