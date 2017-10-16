const config = require('../config.json')
const mongoose = require('mongoose')
const User = require('../models/admin.model.js')
const jwt = require('jsonwebtoken') // 用来创建web token
const md5 = require('md5')
mongoose.Promise = global.Promise

let service = {}

service.authenticate = authenticate

module.exports = service

// 使用用户名和密码查找用户
async function authenticate(loginForm) {
  const username = loginForm.username
  const password = loginForm.password
  const user = await User.findOne({ username: username })
  if (user) {
    if(user._doc.password === md5(password)) {
      return user
    } else {
      return '密码错误'
    }
  } else {
    return '用户名不存在'
  }
  //   if (err) {
  //     throw '服务器错误: ' + err.message;
  //   }
  //   if (user) {
  //     if (user.password === password) {
  //       // 验证通过后返回的用户信息: _id, username, realname, role, token
  //       let token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
  //       deferred.resolve({
  //         _id: user._id,
  //         username: username,
  //         realname: user.realname,
  //         role: user.role,
  //         token: token
  //       });
  //     } else {
  //       throw resolve('密码错误');
  //     }
  //   } else {
  //     deferred.resolve('用户名不存在');
  //   }
  // });
  // // 返回一个promise对象 :)
  // return deferred.promise;
}