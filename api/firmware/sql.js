const { pg } = require('../../app/helpers/helper');

const uploadFirmware = {
    post: {
        saveFirmwareData: async (connection, options, nextFirmware) => {
            await connection.query(`
                INSERT
                INTO smart_mow.firmware
                (changes,
                 version,
                 url)
                VALUES ($1, $2, $3);
            `, [
                options.changes,
                nextFirmware.version,
                nextFirmware.fileName,
            ]);
        },
    }
};

const robots = {
    get: {
        getRobots: async (connection, userId) => {
            const sql = await connection.query(`
                SELECT id,
                       owner_id,
                       version,
                       name
                FROM smart_mow.robot
                WHERE owner_id = $1
                ORDER BY version DESC;
            `, [userId]);

            return pg.resultOrEmptyArray(sql);
        },
    }
};

const allFirmware = {
    get: {
        firmware: async (connection) => {
            const sql = await connection.query(`
                SELECT version, changes
                FROM smart_mow.firmware
                order by version ASC
            `);
            return pg.resultOrEmptyArray(sql);
        },
    }
};

module.exports = {
    uploadFirmware,
    robots,
    allFirmware
};
