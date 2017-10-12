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
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Classify'
  },
  showIndex: {
    type: Boolean,
    required: true
  },
  children: {
    type: [{type: Schema.Types.ObjectId, ref: 'Classify'}],
    default: []
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

module.exports = mongoose.model('Classify',ClassifySchema);