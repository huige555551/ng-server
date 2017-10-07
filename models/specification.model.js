/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var SpecificationSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  order: {
    type: Number,
    default: 1
  },
  displayType: {
    type: Number,
    enum: [1,2],// 1文字,2图片
    required: true,
    default: 1
  },
  remark: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: Date,
  valueArray: {
    type: [{type: Schema.Types.ObjectId,ref: 'Attribution'}],
    default: []
  }
});

module.exports = mongoose.model('Specification',SpecificationSchema);