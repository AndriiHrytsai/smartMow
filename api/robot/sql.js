const createRobot = {
    post: {
        saveRobot: async (connection, options, userId, version) => {
            await connection.query(`
                INSERT
                INTO smart_mow.robot
                (owner_id,
                 version,
                 name)
                VALUES ($1, $2, $3);
            `, [
                userId,
                version,
                options.name,
            ]);
        },
    }
};


module.exports = {
    createRobot
};
