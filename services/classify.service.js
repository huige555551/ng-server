const config = require('../config.json');
const mongoose = require('mongoose');
const Classify = require('../models/classify.model');

mongoose.Promise = global.Promise;

let service = {}

service.getAll = getAll;
service.addClassify = addClassify;
service.deleteClassify = deleteClassify;
service.getClassifyById = getClassifyById;
service.updateChildrenArray = updateChildrenArray;
service.editClassify = editClassify;
service.getFirstCategories = getFirstCategories;
service.getSecondCategories = getSecondCategories;

module.exports = service;

function updateChildrenArray (fatherId, childId) {
  return Classify.findByIdAndUpdate(fatherId, {'$addToSet': {'children': childId}})
}

function getFirstCategories () {
  return Classify.find({'level': 1})
}

function getSecondCategories () {
  return Classify.find({'level': 2})
}

function editClassify (id, rowObj) {
  return Classify.findByIdAndUpdate(id, rowObj)
}

function getAll () {
  return Classify.find({parentId: {$exists: false}}).populate({
    path: 'children',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'children' }
  })
}

function getClassifyById (id) {
  return Classify.findById(id)
}

function getAncestorId (parentId) {
  Classify.findById(parentId).then(doc => {
    return doc.parentId
  })
}

function deleteClassify(id) {
  return Classify.findByIdAndRemove(id)
}

function addClassify (rowObj) {
  if (!rowObj.parentId) {
    var item = new Classify({
      name: rowObj.name,
      level: 1,
      order: rowObj.order,
      showIndex: rowObj.showIndex
    })
    return item.save()
  } else {
    return Classify.findById(rowObj.parentId).then(result => {
      var item = new Classify({
        name: rowObj.name,
        level: result.level + 1,
        parentId: rowObj.parentId,
        order: rowObj.order,
        showIndex: rowObj.showIndex
      })
      return item.save()
    })
  }
}
