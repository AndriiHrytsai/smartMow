const Joi = require('joi');

const schemas = {
    router: {
        updateUser: {
            put: Joi.object().keys({
                fullName: Joi.string().optional(),
                email: Joi.string().email().optional(),
                address: Joi.string().optional(),
                phone: Joi.string().optional(),
            }).required().min(1),
        },
        updatePassword: {
            put: Joi.object().keys({
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
