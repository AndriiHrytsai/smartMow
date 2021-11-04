const controller = require("./controller");

function initEvents(socket) {
    controller.onRobotState(socket);
}

module.exports = {
    initEvents,
};
