const auth = require('../../mobile-api/auth/router');
const notification = require('../../mobile-api/notification/router');
const robot = require('../../mobile-api/robot/router');
const firmware = require('../../mobile-api/firmware/router');
const profile = require('../../mobile-api/profile/router');

module.exports = {
    mobileAPI: (app) => {
        app.use('/auth', auth);
        app.use('/notification', notification);
        app.use('/robot', robot);
        app.use('/firmware', firmware);
        app.use('/profile', profile);
    },
};
