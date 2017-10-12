const config = require('../config.json');
const mongoose = require('mongoose');
const Carousel = require('../models/carousel.model');
const util = require('../common/util')

mongoose.Promise = global.Promise;

let service = {}

service.getAll = getAll;
service.getList = getList;
service.editRowObject = editRowObject;
service.addRowObject = addRowObject;
service.deleteRowObject = deleteRowObject;
service.getRowObject = getRowObject;

module.exports = service;

async function getList(query, perPage, page) {
  let result = {}
  result.pagingData = await Address.find().skip(perPage * (page - 1)).limit(perPage).sort({update_at: 'desc'})
  result.total = await Address.count()
  result.page = page
  return result
}

async function editRowObject (id, rowObj) {
  const result = await Carousel.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getAll () {
  let allCarousel = await Carousel.find().sort({order: 'desc'})
  for (let i = 0, len = allCarousel.length; i < len; i++) {
    allCarousel[i]._doc.image = util.getPrivateDownloadUrl(allCarousel[i]._doc.imageKey)
  }
  return allCarousel
}

async function getRowObject (id) {
  return await Address.findById(id)
}

async function deleteRowObject(id) {
  return await Carousel.findByIdAndRemove(id)
}

async function addRowObject (rowObj) {
  var item = new Carousel(rowObj)
  return await item.save()
}

