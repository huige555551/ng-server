/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var UploadImgSchema = new Schema({
  name: String,
  path: String,
  key: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('UploadImg', UploadImgSchema);