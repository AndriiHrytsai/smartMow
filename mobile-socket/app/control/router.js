const controller = require("./controller");

function initEvents(io, socket) {
    controller.onWorkArea(io, socket);
    controller.onRestrictedArea(io, socket);
}

module.exports = {
    initEvents,
};
