const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.put('/update',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.updateUser.put),
    asyncHandler(controller.updateUser.put),
);

router.put('/update/password',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.updatePassword.put),
    asyncHandler(controller.updatePassword.put),
);

router.get('/',
    asyncHandler(middlewares.auth.user),
    asyncHandler(controller.profileInfo.get),
);


module.exports = router;
