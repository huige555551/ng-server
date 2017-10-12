/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var ProductAttrSchema = new Schema({
  productId: {type: Schema.Types.ObjectId, ref: 'Product', index: true},
  attrIdArray: [{type: Schema.Types.ObjectId, ref: 'Attribution'}],
  price: Number,
  productNo: String,
  unit: {
    type: String,
    default: '元'
  },
  stock: Number,
  sales:{
    type: Number,
    default: 0
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

module.exports = mongoose.model('ProductAttr', ProductAttrSchema);