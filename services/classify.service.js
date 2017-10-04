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
service.addClassifyAndUpdateChildrenArray = addClassifyAndUpdateChildrenArray;
module.exports = service;

function updateChildrenArray (fatherId, childId) {
  return Classify.findByIdAndUpdate(fatherId, {$addToSet: {children: childId}})
}

function getFirstCategories () {
  return Classify.find({'level': 1})
}

function getSecondCategories () {
  return Classify.find({'level': 2})
}

function editClassify (id, rowObj) {
  return  Classify.findById(rowObj._id).then(doc => {
    let oldfather = doc.parentId
    return oldfather
  }).then(oldfather => {
    var promiseArr = []
    promiseArr[0] = Classify.findByIdAndUpdate(rowObj.parentId, {$addToSet: {children: rowObj._id}})
    promiseArr[1] = Classify.findByIdAndUpdate(oldfather, {$pull: {children: rowObj._id}})
    promiseArr[2] = Classify.findByIdAndUpdate(rowObj._id, rowObj)
    return Promise.all(promiseArr)
  })
}

function getAll () {
  return Classify.find({parentId: {$exists: false}}).populate( {path: 'children',
      populate: { path: 'children' }})
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
  return Classify.findByIdAndRemove(id).then(result => {
    for (let i = 0, len = result.children.length; i < len; i++) {
      deleteClassify(result.children[i])
    }
  })
}

function addClassify (rowObj) {
  var item = new Classify({
    name: rowObj.name,
    level: 1,
    order: rowObj.order,
    showIndex: rowObj.showIndex
  })
  return item.save()
}
function addClassifyAndUpdateChildrenArray (rowObj) {
  return Classify.findById(rowObj.parentId).then(result => {
    var item = new Classify({
      name: rowObj.name,
      level: result.level + 1,
      order: rowObj.order,
      parentId: result._id,
      showIndex: rowObj.showIndex
    })
      return item.save()
    }).then(result => {
      return Classify.findByIdAndUpdate(result.parentId, {$addToSet: {children: result._id}})
  })
}
