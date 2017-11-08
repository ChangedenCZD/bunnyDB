let multer = require('nodemailer');
let Email = require('../secret/email.json');
let mailTransport = multer.createTransport({
    host: Email.host,
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: Email.user,
        pass: Email.pass
    }
});

function createOptions(to, title, content, html) {
    return {
        from: Email.user,
        to: to,
        subject: title,
        text: content,
        html: html
    };
}

function sendMail(options, cb) {
    mailTransport.sendMail(options, cb);
}

module.exports = {
    service: mailTransport,
    createOptions: createOptions,
    sendMail: sendMail
};