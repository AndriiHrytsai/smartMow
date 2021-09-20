const auth = require('../../api/auth/router');
const token = require('../../api/token/router');

module.exports = {
    userAPI: (app) => {
        app.use('/auth', auth);
        app.use('/token', token);
    },
};
