/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var ClassifySchema = new Schema({
  name: {
    type: String,
    required:true
  },
  order: {
    type: Number,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  parentId: {
    type: Schema.Types.ObjectId
  },
  showIndex: {
    type: Boolean,
    required: true
  },
  children: {
    type: [{type: Schema.Types.ObjectId,ref: 'Classify'}],
    default: []
  }
});

module.exports = mongoose.model('Classify',ClassifySchema);