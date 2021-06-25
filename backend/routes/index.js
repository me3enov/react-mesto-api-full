const router = require('express').Router();

const { login, createUser, logout } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const userRouter = require('./users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.get('/signout', logout);

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, userRouter);

module.exports = router;
