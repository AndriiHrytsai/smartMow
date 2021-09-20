const Joi = require('joi');

const schemas = {
    router: {
        firebase: {
            post: Joi.object().keys({
                firebaseToken: Joi.string().required(),
            }).required(),
        },
        firebaseMessage: {
            post: Joi.object().keys({
                title: Joi.string().optional(),
                message: Joi.string().required(),
                value: Joi.string().optional(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
