/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var AddressSchema = new Schema({
  type: Number,//1: 发货地址， 2收货地址
  name: String,
  username: String,
  gender: String,// 1: 男， 2：女
  province: String,
  city: String,
  area: String,
  detailArea: String,
  zipCode: String,
  mobilePhone: String,
  phone: String,
  defaultUse: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('Address',AddressSchema);