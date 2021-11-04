const robots = new Map();

function addRobot(robotUUID) {
    robots.set(robotUUID, {
        maxSpeed: 0,
        currentSpeed: 0,
        numberRevolutions: 0,
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
