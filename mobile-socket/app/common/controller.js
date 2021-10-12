const {events} = require('../../helpers/index');
const chalk = require('chalk');

let userConnected = 0;

function onConnection(io, socket) {
    userConnected++;
    console.log(`${chalk.blue('MOBILE connection')}:: UserId: [${chalk.green(socket.userId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(userConnected)}]`);
}

function onDisconnect(io, socket) {
    socket.on(events.disconnect, () => {
        userConnected--;
        console.log(`${chalk.red('MOBILE disconnect')}:: UserId: [${chalk.green(socket.userId)}], Room: [${chalk.blue(socket.roomId)}]. Total Users: [${chalk.red(userConnected)}]`);
    });
}

module.exports = {
    onConnection,
    onDisconnect,
};
