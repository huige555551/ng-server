const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const userService = require('../services/user.service');

// routes
// router.get('/logout', logout);
// router.post('/register', register);
router.get('/all', getAll);
// router.get('/:_id', getUserById);
// router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);

module.exports = router;

// middlewares

function getAll (req, res) {
  userService.getAll()
    .then(result => {
      res.json(result);
    }).catch(err => {
      res.json(err);
    });
}