const { pg } = require('../../app/helpers/helper');
const helper = require('../../app/helpers/helper');

const createRobot = {
    post: {
        saveRobot: async (connection, options, userId, version) => {
            let result = await connection.query(`
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
