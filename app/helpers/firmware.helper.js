const config = require('./config.helper');
const AWS = require('aws-sdk/index');
const path = require('path');

AWS.config.setPromisesDependency();

AWS.config.update({
    accessKeyId: config.aws.s3.accessKeyID,
    secretAccessKey: config.aws.s3.secretAccessKey,
});

let s3 = new AWS.S3({
    params: { Bucket: config.aws.s3.bucketName },
});

let currentFirmware = null;

async function uploadFirmware(file, fileName) {
    let params = {
        Key: "firmware/" + fileName,
        Body: file.data,
    };

    await s3.upload(params).promise();
}

async function getLastFirmware() {
    const response = await s3.listObjectsV2({
        Bucket: config.aws.s3.bucketName,
        Prefix: 'firmware'
    }).promise();

    const files = response.Contents; // all firmware
    if (files.length === 0) {
        throw Error('There is not one firmware in AWS S3');
    }

    files.sort((a, b) => b.LastModified - a.LastModified);
    const firmware = files.shift(); // last firmware object
    const url = config.aws.s3.s3Url + '/' + firmware.Key; // url version firmware
    const fileName = firmware.Key.split('_').pop(); // 1.1.0.zip
    const fileNameArr = fileName.split('.'); // [1, 1, 0, 'zip]
    const extension = '.' + fileNameArr.pop(); // .zip
    const version = parseInt(fileNameArr.join(''), null); // 110

    return {
        url,
        fileName: 'firmware_' + fileName,
        extension,
        version,
    };
}

function getCurrentFirmware() {
    return currentFirmware;
}

function setCurrentFirmware(firmware) {
    currentFirmware = firmware;
}

function nextCurrentFirmware(file) {
    const extension = path.extname(file.name);
    const version = currentFirmware.version + 1;
    const numberVersion = version.toString().split('');
    const fileName = numberVersion.join('.') + extension;
    const url = config.aws.s3.s3Url + '/firmware_' + fileName;

    return {
        url,
        fileName: 'firmware_' + fileName,
        extension,
        version,
    };
}

getLastFirmware().then(value => {
    currentFirmware = value;
});

module.exports = {
    uploadFirmware,
    getCurrentFirmware,
    setCurrentFirmware,
    nextCurrentFirmware,
    getLastFirmware
};
