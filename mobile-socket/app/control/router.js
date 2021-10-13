const controller = require("./controller");

function initEvents(socket, mobileIO, robotIO) {
    controller.onRemoteControl(socket, mobileIO, robotIO);
}

module.exports = {
    initEvents,
};
