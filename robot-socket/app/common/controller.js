const {robot} = require('../../../app/helpers/helper');
const {events} = require('../../helpers/index');
const chalk = require('chalk');

function onConnection(socket) {
    robot.addRobot(socket.robotId);
    console.log(`${chalk.yellow('ROBOT')} ${chalk.blue('connection')}:: UserId: [${chalk.green(socket.robotId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(robot.getTotalRobots())}]`);
}

function onDisconnect(socket) {
    socket.on(events.common.disconnect, () => {
        robot.deleteRobot(socket.robotId);
        console.log(`${chalk.yellow('ROBOT')} ${chalk.red('disconnect')}:: UserId: [${chalk.green(socket.robotId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(robot.getTotalRobots())}]`);
    });
}

module.exports = {
    onConnection,
    onDisconnect,
};
