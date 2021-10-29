const controller = require("./controller");

function initEvents(socket, mobileIO, robotIO) {
    controller.onNotification(socket, mobileIO, robotIO);
}

module.exports = {
    initEvents,
};
