class MainController {
    static register(req, res) {
        const errors = req.query.err;
        res.render('registerPage.ejs', { errors })
    }
    static login(req, res) {
        const errors = req.query.err;
        res.render('loginPage.ejs', { errors });
    }
    static logout(req, res) {
        req.session.destroy(err => {
            if (err) res.send(err)
            else res.redirect('/login');
        })
    }
}

module.exports = MainController;