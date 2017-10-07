/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var ClassifySchema = new Schema({
  name: String,
  onSale: Boolean,
  order: Number,
  preSale: Boolean,
  itemType: Number,
  itemRecommendTypeArray: Array,
  classify: {
    type: [{type: Schema.Types.ObjectId, ref: 'Classify'}],
    default:  []
  },
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: Date,
  images: Array,
  details: String,
  specificationIdArray: [{type: Schema.Types.ObjectId, ref: 'Specification'}]
});

module.exports = mongoose.model('Product',ProductSchema);