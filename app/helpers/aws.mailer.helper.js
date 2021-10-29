const aws = require('aws-sdk');
const config = require('../helpers/config.helper');

function generateRandomNumber(min = 0, max = 9) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

const sendEmail = async (email, code) => {
    const SESConfig = {
        apiVersion: '2010-12-01',
        accessKeyId: config.aws.ses.accessKeyID,
        secretAccessKey: config.aws.ses.secretAccessKey,
        region: config.aws.ses.region
    };

    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: { Data: `Your verification code to forgot password: ${code}` },
            },
            Subject: { Data: 'Forgot Password' },
        },
        Source: 'smartmow.backing@gmail.com',
    };

    try {
        await new aws.SES(SESConfig).sendEmail(params).promise();
    } catch (error) {
        console.log('error sending email ', error);
    }

};

module.exports = {
    sendEmail,
    generateRandomNumber

}

