const {events} = require('../../helpers/index');

function onWorkArea(io, socket) {
    socket.on(events.setWorkArea, () => {
        console.log('set_work_area');
    });
}

function onRestrictedArea(io, socket) {
    socket.on(events.setRestrictedArea, () => {
        console.log('set_restricted_area');
    });
}

module.exports = {
    onWorkArea,
    onRestrictedArea,
};
