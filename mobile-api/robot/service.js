const helper = require('../../app/helpers/helper');
const sql = require('./sql');

const robot = {
    post: async (connection, options, user) => {
        let foundRobot = await sql.createRobot.post.findRobot(connection, options, user.id);
        if (foundRobot) {
            return helper.doom.error.robotAlreadyExist();
        }

        await sql.createRobot.post.addRobot(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'Robot successfully created',
            },
        }
    }
};

module.exports = {
    robot,
};
