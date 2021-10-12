const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/upload',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.firmware.post),
    asyncHandler(controller.firmware.post),
);

router.get('/version',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.firmwareVersion.get),
    asyncHandler(controller.firmwareVersion.get),
);

router.get('/checkUpdate',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.checkUpdate.get),
    asyncHandler(controller.checkUpdate.get),
);


module.exports = router;
