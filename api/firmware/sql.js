const { pg } = require('../../app/helpers/helper');
const helper = require('../../app/helpers/helper');

const uploadFirmware = {
    post: {
        saveFirmwareData: async (connection, data, options) => {
            let result = await connection.query(`
                INSERT
                INTO smart_mow.firmware
                (changes,
                 version,
                 url)
                VALUES ($1, $2, $3);
            `, [
                options.changes,
                data.versionFirmware,
                data.oldFileName,
            ]);
        },
    }
};

const robots = {
    get: {
        getRobots: async (connection, userId) => {
            let sql = `
                SELECT *
                FROM smart_mow.robot
                WHERE owner_id = $1
                ORDER BY version DESC;
            `;
            const result = await connection.query(sql, [userId]);

            return result;
        },
    }
};

const allVersions = {
    get: {
        versions: async (connection, minVersion, maxVersion) => {
            let sql = `
                SELECT changes
                FROM smart_mow.firmware
                WHERE version > $1
                  and version <= $2
            `;

            const result = await connection.query(sql, [minVersion, maxVersion]);

            return result;
        },
    }
};


module.exports = {
    uploadFirmware,
    robots,
    allVersions
};
