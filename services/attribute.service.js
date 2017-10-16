const config = require('../config.json')
const mongoose = require('mongoose')
const Classify = require('../models/classify.model')

mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.addAttributes = addAttributes
service.deleteClassify = deleteClassify
service.getClassifyById = getClassifyById
service.updateChildrenArray = updateChildrenArray
service.editClassify = editClassify
service.getFirstCategories = getFirstCategories
service.getSecondCategories = getSecondCategories
service.addClassifyAndUpdateChildrenArray = addClassifyAndUpdateChildrenArray
module.exports = service

function updateChildrenArray(fatherId, childId) {
  return Classify.findByIdAndUpdate(fatherId, {$addToSet: {children: childId}})
}

function getFirstCategories() {
  return Classify.find({'level': 1})
}

function getSecondCategories() {
  return Classify.find({'level': 2})
}

function editClassify(id, rowObj) {
}

async function getAll() {
  let firstClassify = await Classify.find({level: 1})
  let allClassify = await Classify.find()
  for (let i = 0, len = firstClassify.length; i < len; i++) {
    firstClassify[i].children = getClassifyChildrenDetail(firstClassify[i].children, allClassify)
  }
  return firstClassify
}
function getClassifyChildrenDetail(classifyChildren, allClassify) {
  for (let i = 0, len = classifyChildren.length; i < len; i++) {
    for (let j = 0, len = allClassify.length; j < len; j++) {
      if (classifyChildren[i] == allClassify[j]._id.toString()) {
        classifyChildren[i] = allClassify[j]
        classifyChildren[i].children = getClassifyChildrenDetail(classifyChildren[i].children, allClassify)
        break
      }
    }
  }
  return classifyChildren
}

function getClassifyById(id) {
  return Classify.findById(id)
}

function getAncestorId(parentId) {
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

function addAttributes(rowObj) {
  var item = new Classify({
    name: rowObj.name,
    level: 1,
    order: rowObj.order,
    showIndex: rowObj.showIndex
  })
  return item.save()
}
function addClassifyAndUpdateChildrenArray(rowObj) {
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
