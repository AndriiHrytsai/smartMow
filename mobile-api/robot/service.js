const helper = require('../../app/helpers/helper');
const sql = require('./sql');
const converter = require('./converter');

const allRobots = {
    get: async (connection, options, user) => {
        let foundRobots = await sql.allRobots.get.findRobots(connection, options, user.id);
        let result = converter.allRobots.get(foundRobots);

        return {
            'success': true,
            'result': result,
        }
    }
};

const robot = {
    post: async (connection, options, user) => {
        let foundRobot = await sql.robot.post.findRobot(connection, options, user.id);
        if (foundRobot) {
            return helper.doom.error.robotAlreadyExist();
        }

        await sql.robot.post.addRobot(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'Robot successfully created',
            },
        }
    }
};

const deleteRobot = {
    delete: async (connection, options, user) => {
        let foundRobot = await sql.robot.post.findRobot(connection, options, user.id);
        if (!foundRobot) {
            return helper.doom.error.robotNotFound();
        }

        await sql.deleteRobot.delete(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'Robot successfully deleted',
            },
        }
    }
};

module.exports = {
    allRobots,
    robot,
    deleteRobot
};
