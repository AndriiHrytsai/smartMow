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
        const robotVersion = await helper.firmware.getCurrentFirmware();
        const robots = await sql.robots.get.getRobots(connection, user.id, robotVersion);
        const firmwares = await sql.allFirmware.get.firmware(connection);

        const readyToUpdate = robots.reduce((previousValue, robot) => {
            let changes = []
            for (let firmware of firmwares) {
                if (firmware.version > robot.version) {
                    changes.push(firmware.changes);
                }
            }
            previousValue.push(converter.firmware.get(robot, changes));

            return previousValue;
        }, []);

        return {
            'success': true,
            'result': {
                update: readyToUpdate,
            }
        };
    }
};

module.exports = {
    firmware,
    firmwareVersion,
    checkUpdate
};
