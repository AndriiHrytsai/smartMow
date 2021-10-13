const controller = require("./controller");

function initEvents(socket, mobileIO, robotIO) {
    controller.onWorkArea(socket, mobileIO, robotIO);
    controller.onRestrictedArea(socket, mobileIO, robotIO);
}

module.exports = {
    initEvents,
};
