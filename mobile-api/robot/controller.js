const {controller} = require('../../app/helpers/helper');
const service = require('./service');

const robot = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.robot.post(connection, req.options, req.user);
        });
    }
};

module.exports = {
    robot,
};
