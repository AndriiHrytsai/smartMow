const helper = require('../../app/helpers/helper');
const sql = require('./sql');
const converter = require('./converter');


const firebase = {
    post: async (connection, options, user) => {
        let foundUser = await sql.common.findUserById(connection, user.id);
        if (foundUser === null) {
            return helper.doom.error.accountNotFound();
        }

        await sql.firebase.post.addFirebaseToken(connection, options, user.id);

        return {
            'success': true,
            'result': {
                message: 'The notification was saved successfully.'
            },
        }
    }
};

const sendNotification = {
    post: async (connection, options, user) => {
        let foundUser = await sql.common.findUserById(connection, user.id);
        if (foundUser === null) {
            return helper.doom.error.accountNotFound();
        }

        let send = helper.notification.template.notification(foundUser.firebase_token, {
            title: options.title,
            value: options.value,
            body: options.message,
        });

        await helper.notification.send(send);
        await sql.sendNotification.post.saveNotification(connection, options, user.id)

        return {
            'success': true,
            'result': {
                message: 'The message was sent to the device.'
            },
        }
    }
};

const notifications = {
    post: async (connection, options, user) => {
        const allUserNotifications = await sql.notifications.get.findAllNotification(connection, options, user.id);

        const result = converter.notifications.get(allUserNotifications);

        return {
            'success': true,
            'result': result,
        }
    }
};

module.exports = {
    firebase,
    sendNotification,
    notifications
};
