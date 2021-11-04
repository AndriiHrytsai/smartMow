const {robot} = require('../../../app/helpers/helper');
const {events} = require('../../helpers/index');

function onRobotState(socket) {
    socket.on(events.robot_state, (data) => {
        robot.updateRobot(socket.robotId, data);
    });
}

module.exports = {
    onRobotState,
};
