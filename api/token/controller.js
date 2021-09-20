const {controller} = require('../../app/helpers/helper');
const service = require('./service');

const firebase = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.firebase.post(connection, req.options, req.user);
        });
    }
};

module.exports = {
    firebase,
};
