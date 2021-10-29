const helper = require('../../../app/helpers/helper');
const sql = require('./sql');

async function sendNotification(connection, socket, data) {
    const owners = await sql.getRobotOwners(connection, socket.robotId);
    for (const owner of owners) {
        try {
            let send = helper.notification.template.notification(owner.firebase_token, {
                value: {priority: data.priority},
                title: data.title,
                body: data.message,
            });

            await helper.notification.send(send);
            await sql.saveNotification(connection, owner.id, socket.robotId, data);
        } catch (e) {
            console.log('error send notification from robot socket', e);
        }
    }
}

module.exports = {
    sendNotification,
};
