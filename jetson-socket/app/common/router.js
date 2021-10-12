const controller = require("./controller");

function initEvents(socket) {
    controller.onConnection(socket);
    controller.onDisconnect(socket);
}

module.exports = {
    initEvents,
};
