const helper = require('../../app/helpers/helper');
const sql = require('./sql')
const converter = require('./converter')

const firmware = {
    post: async (connection, options) => {
        const nextFirmware = helper.firmware.nextCurrentFirmware(options.file);
        await helper.firmware.uploadFirmware(options.file, nextFirmware.fileName);
        helper.firmware.setCurrentFirmware(nextFirmware);
        await sql.uploadFirmware.post.saveFirmwareData(connection, options, nextFirmware);

        return {
            'success': true,
            'result': {
                message: 'Firmware successfully uploaded'
            },
        }
    }
};

const firmwareVersion = {
    get: async () => {
        const firmwares = await helper.firmware.getCurrentFirmware();

        return {
            'success': true,
            'result': {
                versionUrl: firmwares.url,
                versionFirmware: firmwares.version,
            },
        }
    }
};

const checkUpdate = {
    get: async (connection, options, user) => {
        const robotVersion = await helper.firmware.getCurrentFirmware(); // 117
        const robots = await sql.robots.get.getRobots(connection, user.id, robotVersion); // all robots
        const allFirmware = await sql.allFirmware.get.firmware(connection); // [115,116,117]

        const readyToUpdate = robots.reduce((previousValue, currentValue) => {
            let changes = []
            for (let firmware of allFirmware) {
                if (firmware.version > currentValue.version) {
                    changes.push(firmware.changes);
                }
            }
            previousValue.push(converter.firmware.get(currentValue, changes));

            return previousValue;
        }, []);

        return {
            'success': true,
            'result': {
                robots: readyToUpdate,
            }
        };
    }
};

module.exports = {
    firmware,
    firmwareVersion,
    checkUpdate
};
