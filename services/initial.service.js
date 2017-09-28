var mongoose = require('mongoose');
var config = require('../config.json');
var md5 = require('md5');
var User = require('../models/user.model');

mongoose.connect(config.mongo.url, config.mongo.options);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

function createAdmin () {
  var admin = new User({
    username: 'admin',
    password: md5('admin'),
    realname: '系统管理员',
    role: ['sys_admin', 'user_admin']
  });
  return admin.save();
}

function initialDB () {
  return new Promise((resolve, reject) => {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      User.findOne({
        username: 'admin',
        realname: '系统管理员'
      })
      .then(doc => {
        if (doc) {
          resolve('系统管理员已存在!');
        } else {
          createAdmin().then(doc => {
            resolve('系统管理员新建成功!');
          });
        }
      })
      .catch(err => {
        reject('服务器启动失败!');
      });
    });
  });
}

module.exports = initialDB;