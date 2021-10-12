const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/create',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.robot.post),
    asyncHandler(controller.robot.post),
);


module.exports = router;
