const Joi = require('joi');

const schemas = {
    router: {
        robot: {
            post: Joi.object().keys({
                name: Joi.string().required(),
                version: Joi.string(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
