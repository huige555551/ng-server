const config = require('../config.json');
const mongoose = require('mongoose');
const Address = require('../models/address.model');
const Classify = require('../models/classify.model');

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
  if (rowObj.defaultUse === 'true') {
    await Address.updateMany({defaultUse: true}, {$set: {'defaultUse': false}})
  }
  const result = await Address.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getAll () {
  const firstClassify = await Classify.find({level: 1})
  const allClassify = await Classify.find()
  for (let i = 0, len = firstClassify.length; i < len; i++) {
    firstClassify[i].children = getClassifyChildrenDetail(firstClassify[i].children, allClassify)
  }
  return firstClassify
}

async function getRowObject (id) {
  return await Address.findById(id)
}

async function deleteRowObject(id) {
  return await Address.findByIdAndRemove(id)
}

async function addRowObject (rowObj) {
  if (rowObj.defaultUse === 'true') {
    await Address.updateMany({defaultUse: true}, {$set: {'defaultUse': false}})
  }
  var item = new Address(rowObj)
  return await item.save()
}

