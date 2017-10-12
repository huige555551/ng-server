/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var AttributionSchema = new Schema({
  value: {
    type:String,
    required:true
  },
  valueHint: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 1
  },
  spacificationId: {
    type: Schema.Types.ObjectId
  },
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Attribution',AttributionSchema);