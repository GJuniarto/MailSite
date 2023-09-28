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
            .catch(err => res.send(err));
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
        console.log(UserId);
        Email.findAll({ where: { UserId }, include: { model: Tag } })
            .then(emails => {
                // res.send(emails);
                res.render('historyPage.ejs', { emails })
            })
            .catch(err => res.send(err))
    }
}

module.exports = UserController;