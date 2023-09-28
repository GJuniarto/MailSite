function isLogIn(req, res, next) {
    if (!req.session.userId) {
        const error = 'You must login to enter our site!'
        res.redirect(`/login?err=${error}`);
    } else {
        next();
    }
}

module.exports = { isLogIn };