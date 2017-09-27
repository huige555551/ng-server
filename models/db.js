var mongoose = require('mongoose');
var User = require('./user');

const mongoDB = 'mongodb://localhost:27017/ng-db';

mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

function createAdmin () {
  var admin = new User({
    username: 'admin',
    password: 'admin',
    realname: '系统管理员',
    role: ['sys_admin', 'user_admin']
  });
  return admin.save();
}

function initialDB () {
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    User.findOne({
      username: 'admin',
      realname: '系统管理员'
    })
    .then(doc => {
      if (doc) {
        console.log('系统管理员已存在!');
      } else {
        createAdmin().then((doc) => {
          console.log('系统管理员新建成功!');
        });
      }
    });
  });
}

module.exports = { initialDB, db };