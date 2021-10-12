const controller = require("./controller");

function initEvents(io, socket) {
    controller.onConnection(io, socket);
    controller.onDisconnect(io, socket);
}

module.exports = {
    initEvents,
};
