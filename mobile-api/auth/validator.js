const Joi = require('joi');

const schemas = {
    router: {
        registration: {
            post: Joi.object().keys({
                fullName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                address: Joi.string().required(),
                phone: Joi.string().required(),
            }).required(),
        },
        login: {
            post: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }).required(),
        },
        forgotPassword: {
            put: Joi.object().keys({
                email: Joi.string().email().required(),
            }).required(),
        },
        verifyCode: {
            post: Joi.object().keys({
                code: Joi.string().required(),
            }).required(),
        },
        changePassword: {
            put: Joi.object().keys({
                password: Joi.string().required(),
                passwordRepeat: Joi.string().required(),
                code: Joi.string().required(),
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
