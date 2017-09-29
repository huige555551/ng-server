var mongoose = require('mongoose');
var config = require('../config.json');
var md5 = require('md5');
var User = require('../models/user.model');
var Q = require('q');

mongoose.connect(config.mongo.url, config.mongo.options);
mongoose.Promise = Q;


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
  const deferred = Q.defer();
  db.on('error', console.error.bind(console, '数据库连接错误:'));
  db.once('open', () => {
    User.findOne({
      username: 'admin',
      realname: '系统管理员'
    })
      .then(doc => {
        if (doc) {
          deferred.resolve('系统管理员已存在!');
        } else {
          createAdmin()
            .then(doc => {
              deferred.resolve('系统管理员新建成功!');
            });
        }
      })
      .catch(err => {
        deferred.reject('服务器启动失败:' + err);
      });
  })
  return deferred.promise;
}

module.exports = initialDB;