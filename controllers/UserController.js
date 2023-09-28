const { Op, where } = require('sequelize');
const { User, Profile, Email, Tag } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {
    static postRegister(req, res) {
        const { email, password, role, firstName, lastName, gender, dateOfBirth } = req.body;
        User.create({ email, password, role })
            .then(user => {
                const UserId = user.id
                return Profile.create({ firstName, lastName, gender, dateOfBirth, UserId })
            })
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map(e => e.message);
                    return res.redirect('/register?err=' + errors);
                }
                return res.send(err);
            });
    }
    static postLogin(req, res) {
        const { email, password } = req.body;
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    const hashPassword = user.password;
                    const isValidPassword = bcrypt.compareSync(password, hashPassword);
                    if (isValidPassword) {
                        req.session.userId = user.id;
                        res.redirect('/sendMail');
                    } else {
                        const errors = 'Password is wrong!';
                        res.redirect(`/login?err=${errors}`);
                    }
                } else {
                    const errors = 'Email is not registered!';
                    res.redirect(`/login?err=${errors}`);
                }

            })
            .catch(err => res.send(err));
    }
    static history(req, res) {
        const UserId = req.session.userId;
        const { subject, sendTo } = req.query;
        const whereOption = { where: { UserId } };
        if (subject) {
            whereOption.where.subject = {
                [Op.iLike]: `%${subject}%`
            }
        }

        if (sendTo) {
            whereOption.where.sentTo = {
                [Op.iLike]: `%${sendTo}%`
            }
        }
        Email.findAll({ ...whereOption, include: { model: Tag } })
            .then(emails => {
                // res.send(emails);
                res.render('historyPage.ejs', { emails })
            })
            .catch(err => res.send(err))
    }
}

module.exports = UserController;