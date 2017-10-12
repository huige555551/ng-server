/**
 * 用户信息
 */
var mongoose = require('./db.js'),
Schema = mongoose.Schema;

var CarouselSchema = new Schema({
  order: Number,
  imageKey: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Carousel', CarouselSchema);