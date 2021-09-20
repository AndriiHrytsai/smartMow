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
            'result': {},
        }
    }
};

module.exports = {
    firebase,
};
