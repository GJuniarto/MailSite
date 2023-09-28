const { Profile, User } = require('../models');

class ProfileController {
    static getProfile(req, res) {
        const message = req.query.message;
        const UserId = req.session.userId;
        User.findByPk(UserId, { include: Profile })
            .then(user => {
                const profile = user.Profile;
                res.render('profilePage.ejs', { profile, message })
            })
            .catch(err => res.send(err));
    }
    static postProfile(req, res) {
        const { firstName, lastName, dateOfBirth, gender } = req.body;
        const UserId = req.session.userId;
        User.findByPk(UserId, { include: Profile })
            .then(user => {
                const ProfileId = user.Profile.id;
                Profile.update({ firstName, lastName, dateOfBirth, gender }, { where: { id: ProfileId } })
                    .then(() => {
                        const message = 'Profile has been updated!';
                        res.redirect('/profile?message=' + message);
                    })
                    .catch((err) => res.send(err));
            })
    }
}

module.exports = ProfileController;