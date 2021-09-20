const helper = require('../../app/helpers/helper');
const sql = require('./sql');

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
                message: 'The token was saved successfully.'
            },
        }
    }
};

const firebaseMessage = {
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

        return {
            'success': true,
            'result': {
                message: 'The message was sent to the device.'
            },
        }
    }
};

module.exports = {
    firebase,
    firebaseMessage,
};
