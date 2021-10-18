const {controller} = require('../../app/helpers/helper');
const service = require('./service');

const allRobots = {
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.allRobots.get(connection, req.options, req.user);
        });
    }
};

const robot = {
    post: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.robot.post(connection, req.options, req.user);
        });
    }
};

module.exports = {
    allRobots,
    robot,
};
