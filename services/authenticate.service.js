const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken'); // 用来创建web token
const Q = require('q');

const db = mongoose.connect(config.mongo.url, config.mongo.options).connection;

let service = {}

service.authenticate = authenticate;

module.exports = service;

// 使用用户名和密码查找用户, 返回一个Promise对象(Q)
function authenticate (loginForm) {
  const deferred = Q.defer(); // 声明了一个promise对象
  const username = loginForm.username;
  const password = loginForm.password;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      deferred.reject('服务器错误: ' + err.message);
    }
    if (user) {
      if (user.password === password) {
        // 验证通过后返回的用户信息: _id, username, realname, role, token
        let token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
        deferred.resolve({
          _id: user._id,
          username: username,
          realname: user.realname,
          role: user.role,
          token: token
        });
      } else {
        deferred.resolve('密码错误');
      }
    } else {
      deferred.resolve('用户名不存在');
    }
  });
  // 返回一个promise对象 :)
  return deferred.promise;
}