const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// routes
router.post('/login', authenticate);
// router.get('/logout', logout);
// router.post('/register', register);
router.get('/all', getAll);
// router.get('/:_id', getUserById);
// router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);

module.exports = router;

// middlewares
function authenticate (req, res) {
  const username = req && req.body.username;
  const password = req && req.body.password;
  userService.authenticate({
    username: username,
    password: password
  }).then(result => {
    if (result) {
      res.sendStatus(200).send('OK');
    } else {
      res.sendStatus(404).send('Not Found');
    }
  }).catch(err => {
    res.sendStatus(500).send('服务器错误');
  });
}

function getAll (req, res) {
  userService.getAll()
    .then(result => {
      res.json(result);
    }).catch(err => {
      res.json(err);
    });
}