const pg = require('../../../app/drivers/pg.driver');
const {events} = require('../../helpers/index');
const service = require('./service');

function onNotification(socket) {
    socket.on(events.notification, (data) => {
        pg.transaction(async (connection) => {
            await service.sendNotification(connection, socket, data);
        }).catch(console.error);
    });
}

module.exports = {
    onNotification,
};
