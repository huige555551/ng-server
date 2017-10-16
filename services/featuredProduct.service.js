const config = require('../config.json')
const mongoose = require('mongoose')
const FeaturedProduct = require('../models/featuredProduct.model')
const Carousel = require('../models/carousel.model')
const util = require('../common/util')

mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.getList = getList
service.editRowObject = editRowObject
service.addRowObject = addRowObject
service.deleteRowObject = deleteRowObject
service.getRowObject = getRowObject

module.exports = service

async function getList(query, perPage, page) {
  let result = {}
  result.pagingData = await Address.find().skip(perPage * (page - 1)).limit(perPage).sort({update_at: 'desc'})
  result.total = await Address.count()
  result.page = page
  return result
}

async function editRowObject (id, rowObj) {
  const result = await FeaturedProduct.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getAll () {
  let allFeaturedProduct = await FeaturedProduct .find().populate({path: 'productId', select: 'name images'}).sort({order: 'desc'})
  for (let i = 0, len = allFeaturedProduct.length; i < len; i++) {
    allFeaturedProduct[i]._doc.name = allFeaturedProduct[i]._doc.productId.name
    allFeaturedProduct[i]._doc.image = util.getPrivateDownloadUrl(allFeaturedProduct[i]._doc.productId.images[0], 'imageView2/2/w/200/h/100')
    allFeaturedProduct[i]._doc.productId = allFeaturedProduct[i]._doc.productId._id
  }
  return allFeaturedProduct
}

async function getRowObject (id) {
  return await Address.findById(id)
}

async function deleteRowObject(id) {
  return await Carousel.findByIdAndRemove(id)
}

async function addRowObject (rowObj) {
  var item = new FeaturedProduct(rowObj)
  return await item.save()
}

