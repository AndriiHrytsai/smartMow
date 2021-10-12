const sql = require('./sql');
const { versionRobotFirmware } = require('../../app/helpers/aws.helper')

const robot = {
    post: async (connection, options, user) => {
        const robotVersion = await versionRobotFirmware();

        await sql.createRobot.post.saveRobot(connection, options, user.id, robotVersion)

        return {
            'success': true,
            'result': {
                message: 'Robot successfully created'
            },
        }
    }
};

module.exports = {
    robot
};
