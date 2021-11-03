const controller = require("./controller");

function initEvents(socket) {
    controller.onPingRobot(socket);
}

module.exports = {
    initEvents,
};
