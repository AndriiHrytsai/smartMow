const {events} = require('../../helpers/index');
const chalk = require('chalk');

let robotConnected = 0;

function onConnection(socket) {
    robotConnected++;
    console.log(`${chalk.yellow('ROBOT')} ${chalk.blue('connection')}:: UserId: [${chalk.green(socket.robotId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(robotConnected)}]`);
}

function onDisconnect(socket) {
    socket.on(events.common.disconnect, () => {
        robotConnected--;
        console.log(`${chalk.yellow('ROBOT')} ${chalk.red('disconnect')}:: UserId: [${chalk.green(socket.robotId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(robotConnected)}]`);
    });
}

module.exports = {
    onConnection,
    onDisconnect,
};
