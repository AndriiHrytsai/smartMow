const auth = require('../../api/auth/router');
const notification = require('../../api/notification/router');
const firmware = require('../../api/firmware/router');
const robot = require('../../api/robot/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
        app.use('/notification', notification);
        app.use('/firmware', firmware);
        app.use('/robot', robot);
    },
};
