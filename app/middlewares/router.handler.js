const auth = require('../../mobile-api/auth/router');
const notification = require('../../mobile-api/notification/router');

module.exports = {
    mobileAPI: (app) => {
        app.use('/auth', auth);
        app.use('/notification', notification);
    },
};
