const {StatusCodes} = require('http-status-codes');
const config = require('./config.helper');
const pg = require('../drivers/pg.driver');

function simulateLoading() {
    return new Promise(resolve => {
        let maxLoading = config.loading.maxLoading - config.loading.minLoading;
        let minLoading = config.loading.minLoading;
        let timeout = Math.floor(Math.random() * maxLoading) + minLoading;
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

async function sendJson(res, action, status = StatusCodes.OK) {
    let result = null;

    await pg.transaction(async (connection) => {
        result = await action(connection);
    });

    if (result === null) {
        throw new Error('Transaction not correct.');
    }

    if (config.loading.simulateLoading) {
        await simulateLoading();
    }

    if (result.success) {
        return res.status(status).json({
            ...result.result
        });
    } else {
        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            error: result.error,
            errorCode: result.errorCode
        });
    }
}

async function sendFile(res, action, pathSuccess, pathFail, status = StatusCodes.OK) {
    let result = null;

    await pg.transaction(async (connection) => {
        result = await action(connection);
    });

    if (result === null) {
        throw new Error('Transaction not correct.');
    }

    if (result.success) {
        return res.status(status).sendFile(pathSuccess);
    } else {
        return res.status(result.statusCode).sendFile(pathFail);
    }
}

/*
// Blob Example:
// NPM -> "node-fetch"
const url = speechLink;
const buffer = await new Promise((resolve, reject) => {
    fetch(url)
        .then(res => res.buffer())
        .then(buffer => resolve(buffer))
        .catch(reason => {
            reject(reason)
        })
});
 */
async function sendBuffer(res, action, status = StatusCodes.OK) {
    let transaction = null;

    await pg.transaction(async (connection) => {
        transaction = await action(connection);
    });

    if (transaction === null) {
        throw new Error('Transaction not correct.');
    }

    if (transaction.result.buffer === undefined) {
        throw new Error('Buffer not found.');
    }

    if (transaction.success) {
        res.status(status);
        res.setHeader('Content-Disposition', 'attachment; filename=' + `speech.mp3`);
        res.write(transaction.result.buffer, 'binary');
        res.end(undefined, 'binary');
    } else {
        return res.status(transaction.statusCode).json({
            success: transaction.success,
            message: transaction.message,
            error: transaction.error,
            errorCode: transaction.errorCode
        });
    }
}

async function sendOnlyFile(res, path, status = StatusCodes.OK) {
    return res.status(status).sendFile(path);
}

function send(res, result, status = StatusCodes.OK) {
    if (result.success) {
        return res.status(status).json(result);
    } else {
        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            error: result.error,
            errorCode: result.errorCode
        });
    }
}

module.exports = {
    sendJson,
    sendFile,
    sendBuffer,
    sendOnlyFile,
    send,
};
