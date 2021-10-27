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

router.put('/forgot/password',
    validator.main(schemas.router.forgotPassword.put),
    asyncHandler(controller.forgotPassword.put),
);

router.post('/verify',
    validator.main(schemas.router.verifyUser.post),
    asyncHandler(controller.verifyUser.post),
);

router.put('/change/password',
    validator.main(schemas.router.changePassword.put),
    asyncHandler(controller.changePassword.put),
);


module.exports = router;
