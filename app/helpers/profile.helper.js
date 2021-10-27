const nodemailer = require('nodemailer');
const config = require('../../config/dev.json')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mailer.login,
        pass: config.mailer.password
    }
});

const sendMail = async (userMail, code) => {
    return transporter.sendMail({
        from: 'Support',
        to: 'andrii.hrytsai.tr.2018@lpnu.ua',
        subject: 'Verification code',
        html: code
    });

};

function generateRandomNumber(min = 0, max = 9) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

module.exports = {
    sendMail,
    generateRandomNumber
};
