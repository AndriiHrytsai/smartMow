const notifications = {
    get: (notification) => {
        const result = []

        notification.forEach(value => {
            result.push({
                "owner": value.owner,
                "message": value.message,
                "tittle": value.tittle,
                "priority": value.priority,
                "date": value.date,
            })
        })
        return { notifications: result };
    }
};

module.exports = {
    notifications
};
