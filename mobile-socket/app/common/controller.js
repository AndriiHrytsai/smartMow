const {events} = require('../../helpers/index');
const chalk = require('chalk');

let userConnected = 0;

function onConnection(socket) {
    userConnected++;
    console.log(`${chalk.cyan('MOBILE')} ${chalk.blue('connection')}:: UserId: [${chalk.green(socket.userId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(userConnected)}]`);
}

function onDisconnect(socket) {
    socket.on(events.common.disconnect, () => {
        userConnected--;
        console.log(`${chalk.cyan('MOBILE')} ${chalk.red('disconnect')}:: UserId: [${chalk.green(socket.userId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(userConnected)}]`);
    });
}

module.exports = {
    onConnection,
    onDisconnect,
};
