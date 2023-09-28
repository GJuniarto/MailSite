const nodemailer = require('nodemailer');
const smtpPassword = "gmavrpzpiaopcffv";

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "mailsitehacktiv8@gmail.com",
        pass: smtpPassword,
    },
});

module.exports = mailer;