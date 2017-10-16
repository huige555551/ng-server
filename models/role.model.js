/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var RoleSchema = new Schema({
  name: String,
  permissionList: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Role',RoleSchema);