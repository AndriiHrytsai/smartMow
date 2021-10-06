const doom = require('./doom.helper');
const general = require('./general.helper');

const main = (schema) => {
    return (req, res, next) => {
        let files = req.files || {};
        let data = general.assign(files, req.params, req.body, req.query);

        const {value, error} = schema.validate(data);
        if (error) {
            return doom.error.validation(res, error);
        }

        req.options = value;
        next();
    };
};

const allRequest = () => {
    return (req, res, next) => {
        let files = req.files || {};
        const data = general.assign(files, req.params, req.body, req.query);

        req.options = data;
        next();
    };
};

module.exports = {
    main,
    allRequest
};
