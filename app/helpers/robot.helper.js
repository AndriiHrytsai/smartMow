const robots = new Map();

function addRobot(robotUUID) {
    robots.set(robotUUID, {
        // some data
    });
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
    deleteRobot,
    getRobot,
    getTotalRobots,
};
