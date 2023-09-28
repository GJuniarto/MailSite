const { Tag } = require('../models');

class TagController {
    static getSendMail(req, res) {
        const status = req.query.status;
        Tag.findAll()
            .then(tags => {
                // res.send(tags);
                res.render('sendMail.ejs', { status, tags });
            })
            .catch(err => res.send(err));

    }
}

module.exports = TagController;