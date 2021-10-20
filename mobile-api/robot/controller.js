const { controller } = require('../../app/helpers/helper');
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

const deleteRobot = {
    delete: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.deleteRobot.delete(connection, req.options, req.user);
        });
    }
};

const schedule = {
    put: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.schedule.put.addOrUpdateSchedule(connection, req.options);
        })
    },
    get: async (req, res) => {
        await controller.sendJson(res, async (connection) => {
            return await service.schedule.get.getSchedule(connection, req.options);
        });
    }
};


module.exports = {
    allRobots,
    robot,
    deleteRobot,
    schedule,
};
