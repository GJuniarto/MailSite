const router = require('express').Router();
const UserController = require('../controllers/UserController');
const MainController = require('../controllers/MainController');
const EmailController = require('../controllers/EmailController');
const TagController = require('../controllers/TagController');
const { isLogIn } = require('../helpers/helper');
const ProfileController = require('../controllers/ProfileController');

//GET and POST /register
router.get('/register', MainController.register);
router.post('/register', UserController.postRegister);

//GET and POST /login
router.get('/login', MainController.login);
router.post('/login', UserController.postLogin);

// Set isLogIn middleware
router.use(isLogIn);

// GET and POST /sendMail
router.get('/sendMail', TagController.getSendMail);
router.post('/sendMail', EmailController.postSendMail);

//GET /history
router.get('/history', UserController.history)

//GET and POST /profile
router.get('/profile', ProfileController.getProfile);
router.post('/profile', ProfileController.postProfile);

//GET /deleteemail/:id
router.get('/emaildelete/:id', EmailController.deleteEmail);

//GET /logout
router.get('/logout', MainController.logout)

module.exports = router;