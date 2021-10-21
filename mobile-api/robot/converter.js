const allRobots = {
    get: (robots) => {
        const result = [];

        robots.forEach(value => {
            result.push({
                "id": value.id,
                "ownerId": value.owner_id,
                "version": value.version,
                "name": value.name,
                "robotUUID": value.robot_uuid,
            },)
        });
        return { robots: result };
    }
};

const schedule = {
    get: (foundSchedule) => {
        return {
            "days": foundSchedule.days,
        };
    }
};

module.exports = {
    allRobots,
    schedule,
};
