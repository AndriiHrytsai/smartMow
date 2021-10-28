const controller = require("./controller");

function initEvents(socket, mobileIO, robotIO) {
    controller.onSchedule(socket, mobileIO, robotIO);
}

module.exports = {
    initEvents,
};
