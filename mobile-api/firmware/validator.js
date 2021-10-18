const Joi = require('joi');

const schemas = {
    router: {
        firmware: {
            post: Joi.object().keys({
                file: Joi.required(),
                fileName: Joi.string(),
                changes: Joi.string()
            }).required(),
        },
        firmwareVersion: {
            get: Joi.object().keys({
                versionUrl: Joi.string(),
                versionFirmware: Joi.number()
            }).required(),
        },
        checkUpdate: {
            get: Joi.object().keys({
                version: Joi.string(),
                name: Joi.string()
            }).required(),
        },
    }
};

module.exports = {
    schemas,
};
