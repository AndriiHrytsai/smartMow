const {validator, middlewares} = require('../../app/helpers/helper');
const {schemas} = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.post('/firebase',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.firebase.post),
    asyncHandler(controller.firebase.post),
);

module.exports = router;
