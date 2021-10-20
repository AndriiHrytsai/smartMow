const { validator, middlewares } = require('../../app/helpers/helper');
const { schemas } = require('./validator');
const express = require('express');
const router = express.Router({});
const asyncHandler = require('express-async-handler');
const controller = require('./controller');

router.get('/all',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.allRobots.get),
    asyncHandler(controller.allRobots.get),
);

router.post('/create',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.robot.post),
    asyncHandler(controller.robot.post),
);

router.delete('/',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.deleteRobot.delete),
    asyncHandler(controller.deleteRobot.delete),
);

router.put('/schedule',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.schedule.put),
    asyncHandler(controller.schedule.put),
);

router.get('/work/days',
    asyncHandler(middlewares.auth.user),
    validator.main(schemas.router.workDays.get),
    asyncHandler(controller.workDays.get),
);

module.exports = router;
