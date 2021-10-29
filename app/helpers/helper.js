module.exports = {
    config: require('./config.helper'),
    controller: require('./controller.helper'),
    doom: require('./doom.helper'),
    firmware: require('./firmware.helper'),
    general: require('./general.helper'),
    header: require('./header.helper'),
    notification: require('./notification.helper'),
    pg: require('./pg.helper'),
    token: require('./token.helper'),
    validator: require('./validator.helper'),
    awsMailer: require('./aws.mailer.helper'),

    middlewares: {
        auth: require('../middlewares/auth.handler'),
        cors: require('../middlewares/cors.handler'),
        error: require('../middlewares/error.handler'),
        notFound: require('../middlewares/not-found.handler'),
    },
};
