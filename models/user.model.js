var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
  id: Schema.ObjectId,
  username: {
    type: String,
    required: true,
    max: 100
  },
  password: {
    type: String,
    required: true,
    max: 100
  },
  realname: {
    type: String,
    required: true,
    max: 50
  },
  role: {
    type: Array,
    required: true,
    enum: ['sys_admin', 'user_admin', 'teacher', 'ta', 'student']
  },
  email: String,
  avatar: String,
  sid: String,
  class_id: {
    type: Schema.ObjectId,
    ref: 'Class'
  },
  group_id: {
    type: Schema.ObjectId,
    ref: 'Group'
  }
});

var model = mongoose.model('User', UserSchema);

module.exports = model;