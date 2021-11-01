const nodeMailer = require('nodemailer');
const emailTemplates = require('email-templates');
const path = require('path');
const templateInfo = require('./email.templates/index');
const helper = require('../helpers/helper');

function generateVerifyCode(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const templateParser = new emailTemplates({
    views: {
        root: path.join(process.cwd(), 'app', 'helpers', 'email.templates')
    }
})

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'smartMow.backing@gmail.com',
        pass: 'adminsmartmow'
    }
});

const sendMail = async (userMail, context = {}) => {
    const templateToSend = templateInfo.forgotPassword;

    if (!templateToSend) {
        return helper.doom.error.wrongTemplate();
    }
    const html = await templateParser.render(templateToSend.templateName, context)
    return transporter.sendMail({
        from: 'smartMow.backing@gmail.com',
        to: userMail,
        subject: templateToSend.subject,
        html
    });
};

module.exports = {
    generateVerifyCode,
    sendMail,
};

