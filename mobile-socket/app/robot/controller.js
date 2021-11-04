const {robot} = require('../../../app/helpers/helper');
const {events} = require('../../helpers/index');

function onPingRobot(socket) {
    socket.on(events.robot.ping, (data) => {
        if (data.robotUUID === undefined) {
            console.log('onPingRobot not found robot UUID');
            return;
        }

        let foundRobot = robot.getRobot(data.robotUUID);
        if (foundRobot) {
            socket.emit(events.robot.is_connected, {found: true, robot: foundRobot});
        } else {
            socket.emit(events.robot.is_connected, {found: false, robot: null});
        }
    });
}

module.exports = {
    onPingRobot,
};
