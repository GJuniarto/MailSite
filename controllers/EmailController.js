const mailer = require("../helpers/mailer");
const { Email, EmailTag } = require('../models');

class EmailController {
    static postSendMail(req, res) {
        const { sentTo, subject, html, tags } = req.body;
        const UserId = req.session.userId;
        let status;
        mailer.sendMail({
            from: 'mailsitehacktiv8@gmail.com',
            to: sentTo.trim(),
            subject: subject,
            html: html, // html body
        })
            .then(info => {
                if (info.accepted.length) {
                    status = "Sent"
                } else {
                    status = "Failed"
                }
                return Email.create({ sentTo, subject, html, status, UserId });
            })
            .then(info => {
                const tagsArr = [];
                tags.forEach(tag => {
                    tagsArr.push(EmailTag.create({ EmailId: info.id, TagId: tag }));
                })
                return Promise.all(tagsArr);
            })
            .then(() => {
                res.redirect('/sendMail?status=' + status);
            })
            .catch(err => res.send(err));
    }
    static deleteEmail(req, res) {
        const id = req.params.id;
        Email.destroy({ where: { id } })
            .then(() => {
                res.redirect('/history');
            })
            .catch(err => res.send(err));

    }
}

module.exports = EmailController;