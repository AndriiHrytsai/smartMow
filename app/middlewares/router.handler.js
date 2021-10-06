const auth = require('../../api/auth/router');
const notification = require('../../api/notification/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
        app.use('/notification', notification);
    },
};
