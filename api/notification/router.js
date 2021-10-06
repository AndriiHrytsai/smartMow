const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/firebase',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.firebase.post),
    asyncHandler(controller.firebase.post),
);

router.post('/send',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.sendNotification.post),
    asyncHandler(controller.sendNotification.post),
);

router.get('/',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.notifications.get),
    asyncHandler(controller.notifications.get),
);

router.get('/robot',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.robotNotifications.get),
    asyncHandler(controller.robotNotifications.get),
);

module.exports = router;
