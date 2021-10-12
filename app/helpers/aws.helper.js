const config = require('./config.helper')
const AWS = require('aws-sdk/index');


AWS.config.update({
    accessKeyId: config.aws.s3.accessKeyID,
    secretAccessKey: config.aws.s3.secretAccessKey,
});

let s3 = new AWS.S3({
    params: { Bucket: config.aws.s3.bucketName }
});

async function addFile(file, fileName) {
    let params = {
        Key: "firmware/" + fileName,
        Body: file.data
    };

    await s3.upload(params).promise();
}

async function deleteFile(fileName, dir) {
    let path = '';
    if (dir) path = dir + "/";
    path += fileName;
    let params = { Key: path };
    await s3.deleteObject(params).promise();
}

function getDirPath(dirName) {
    const s3UrlFirmware = config.aws.s3.s3UrlFirmware + '/';
    return dirName ? (s3UrlFirmware + dirName) : '';
}

async function getFiles() {
    AWS.config.setPromisesDependency();

    AWS.config.update({
        accessKeyId: config.aws.s3.accessKeyID,
        secretAccessKey: config.aws.s3.secretAccessKey,
    });

    const s3 = new AWS.S3();
    const response = await s3.listObjectsV2({
        Bucket: config.aws.s3.bucketName,
        Prefix: 'firmware'
    }).promise()

    let files = response.Contents; // all firmware

    files.sort((a, b) => b.LastModified - a.LastModified);

    let lastFirmware = files.shift() // last version
    let versionUrl = config.aws.s3.s3Url + '/' + lastFirmware.Key; // url version firmware

    let name = lastFirmware.Key;  // name firmware
    const fileURL = 'firmware_';

    name = name.split('_').pop().split('.');

    let fileExtension = name.pop(); // zip
    name = name.join('');

    let versionFirmware = name.toString().split('').join('.');
    let nameTwo = name.toString().split('').join('.');
    const oldFileName = fileURL + nameTwo + '.' + fileExtension;

    name = +name + 1;

    name = name.toString().split('').join('.');

    const result = fileURL + name + '.' + fileExtension;
    return {
        result: result,
        versionUrl: versionUrl,
        versionFirmware: versionFirmware,
        oldFileName: oldFileName
    }
}

const versionRobotFirmware = async () => {
    const allFiles = await getFiles();
    return allFiles.versionFirmware
}

module.exports = {
    addFile,
    deleteFile,
    getDirPath,
    getFiles,
    versionRobotFirmware
};
