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
        const foundRobot = await sql.common.findRobot(connection, options, user.id);
        if (foundRobot) {
            return {
                'success': true,
                'result': {
                    message: 'Robot already exist',
                },
            }
        }

        await sql.robot.post.addRobot(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'Robot successfully created',
            },
        }
    },

    delete: async (connection, options, user) => {
        const foundRobot = await sql.common.findRobot(connection, options, user.id);
        if (foundRobot === null) {
            return helper.doom.error.robotNotFound();
        }

        await sql.robot.delete.deleteRobot(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'Robot successfully deleted',
            },
        }
    }
};

const schedule = {
    put: async (connection, options) => {
        await sql.schedule.put.addSchedule(connection, options);

        return {
            'success': true,
            'result': {
                message: 'Days successfully added',
            }
        }
    },

    get: async (connection, options) => {
        const foundSchedule = await sql.schedule.get.findSchedule(connection, options);
        const result = converter.schedule.get(foundSchedule);

        return {
            'success': true,
            'result': result,
        }
    },
};

module.exports = {
    allRobots,
    robot,
    schedule,
};
