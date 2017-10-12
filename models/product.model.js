/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  onSale: Boolean,
  order: Number,
  preSale: Boolean,
  itemType: Number,
  itemRecommendTypeArray: Array,
  classifies: {
    type: [{type: Schema.Types.ObjectId, ref: 'Classify'}],
    default:  []
  },
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  },
  isFeature: {
    type: Boolean,
    default: false
  },
  featureOrder: {
    type: Number,
    default: 1
  },
  images: Array,
  details: String,
  specifications: [{
    specificationsItemId: {type: Schema.Types.ObjectId, ref: 'Specification'},
    specificationsItem: [{type: Schema.Types.ObjectId, ref: 'Attribution'}]
  }],
  productAttrs: [{
    attrIdArray: {
      type: [{type: Schema.Types.ObjectId, ref: 'Attribution'}],
      default: []
    },
    price: Number,
    productNo: String,
    unit: {
      type: String,
      default: '元'
    },
    stock: Number,
    sales: {
      type: Number,
      default: 0
    }
  }]
  // specificationIdArray: [{type: Schema.Types.ObjectId, ref: 'Specification'}]
});

module.exports = mongoose.model('Product', ProductSchema);