const firmware = {
    get: (robot, changes) => {
        return {
            name: robot.name,
            version: robot.version,
            changes: changes
        }
    }
};


module.exports = {
    firmware,
};
