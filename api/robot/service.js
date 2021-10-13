const sql = require('./sql');
const helper = require('../../app/helpers/helper');

const robot = {
    post: async (connection, options, user) => {
        const { version } = await helper.firmware.getCurrentFirmware();

        await sql.createRobot.post.saveRobot(connection, options, user.id, version)

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
