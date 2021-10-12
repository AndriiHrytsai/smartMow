const helper = require('../../app/helpers/helper');
const { versionRobotFirmware } = require('../../app/helpers/aws.helper');
const sql = require('./sql')
const { getChanges } = require('../../app/helpers/general.helper');

const firmware = {
    post: async (connection, options, user) => {
        const data = await helper.aws.getFiles();
        await helper.aws.addFile(options.file, data.result);

        const response = await helper.aws.getFiles();
        await sql.uploadFirmware.post.saveFirmwareData(connection, response, options)

        return {
            'success': true,
            'result': {
                message: 'Firmware successfully uploaded'
            },
        }
    }
};

const firmwareVersion = {
    get: async (options, user) => {
        const { versionUrl, versionFirmware } = await helper.aws.getFiles();
        return {
            'success': true,
            'result': {
                versionUrl: versionUrl,
                versionFirmware: versionFirmware,

            },
        }
    }
};

const checkUpdate = {
    get: async (connection, options, user) => {
        const robotVersion = await versionRobotFirmware();
        const robots = await sql.robots.get.getRobots(connection, user.id, robotVersion);

        const readyToUpdate = [];
        for (let test of robots.rows) {
            const getVersions = await sql.allVersions.get.versions(connection, test.version, robotVersion);
            const result = { name: test.name, version: test.version, changes: getChanges(getVersions.rows) }

            readyToUpdate.push(result);
        }

        return {
            'success': true,
            'result': {
                robots: readyToUpdate
            }
        };
    }
}

module.exports = {
    firmware,
    firmwareVersion,
    checkUpdate
};
