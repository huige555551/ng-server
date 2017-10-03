/**
 * 用户信息
 */
var mongoose = require('./models/db.js'),
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
  parentId: {
    type: Schema.ObjectId
  },
  showIndex: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Classify',ClassifySchema);