var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = Schema({
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
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  email: String,
  avatar: String
});

var model = mongoose.model('Admin', AdminSchema);

module.exports = model;