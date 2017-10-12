/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var FeaturedProductSchema = new Schema({
  order: Number,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
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

module.exports = mongoose.model('FeaturedProduct', FeaturedProductSchema);