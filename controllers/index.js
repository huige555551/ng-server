const router = require('express').Router();

const userController = require('./user.controller');

router.use('/user', userController);

module.exports = router;