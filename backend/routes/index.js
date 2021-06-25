const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');

router.use(userRoutes, auth);
router.use(cardRoutes, auth);

module.exports = router;
