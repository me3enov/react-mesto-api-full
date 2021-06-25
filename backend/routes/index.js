const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');

router.use('/', auth, userRoutes);
router.use('/', auth, cardRoutes);

module.exports = router;
