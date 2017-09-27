var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('welcome to my api page');
});

router.post('/login', (req, res, next) => {
  console.log('login!');
  res.send('登录成功');
});
module.exports = router;