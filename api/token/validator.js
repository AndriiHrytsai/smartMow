const Joi = require('joi');

const schemas = {
    router: {
        firebase: {
            post: Joi.object().keys({
                firebaseToken: Joi.string().required(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
