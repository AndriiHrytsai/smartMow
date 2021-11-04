const robots = new Map();

function addRobot(robotUUID) {
    robots.set(robotUUID, {
        max_speed: 0,
        current_speed: 0,
        number_revolutions: 0,
        battery: 0,
        warranty: false,
    });
}

function updateRobot(robotUUID, data) {
    let robot = robots.get(robotUUID);
    if (robot) {
        robots.set(robotUUID, {
            ...robot,
            ...data,
        });
    }
}

function deleteRobot(robotUUID) {
    robots.delete(robotUUID);
}

function getRobot(robotUUID) {
    return robots.get(robotUUID);
}

function getTotalRobots() {
    return robots.size;
}

module.exports = {
    addRobot,
    updateRobot,
    deleteRobot,
    getRobot,
    getTotalRobots,
};
