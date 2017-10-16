/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  name: String,
  moduleName: String,
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  },
  identification: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Permission',PermissionSchema);