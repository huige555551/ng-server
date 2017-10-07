const config = require('../config.json');
const mongoose = require('mongoose');
const Classify = require('../models/classify.model');

mongoose.Promise = global.Promise;

let service = {}

service.getAll = getAll;
service.editRowObject = editRowObject;
service.addRowObject = addRowObject;
service.deleteRowObject = deleteRowObject;
service.getRowObject = getRowObject;

service.updateChildrenArray = updateChildrenArray;
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

function editRowObject (id, rowObj) {
  if(!rowObj.parent) {
    delete rowObj.parent
  }
  return Classify.findById(rowObj._id).populate({ path: 'parent' })
      .then(oldfather => {
        if (oldfather) {
          return Classify.findByIdAndUpdate(oldfather.parent, {$pull: {children: rowObj._id}})
        }
      })
      .then(doc => {
        if (rowObj.parent) {
          return Classify.findByIdAndUpdate(rowObj.parent, {$addToSet: {children: rowObj._id}})
        }
      })
      .then(newParent => Classify.findByIdAndUpdate(rowObj._id, Object.assign(rowObj,{level: rowObj.parent ? newParent.level + 1 : 1})))
}

function getAll () {
  var promiseArr = []
  promiseArr[0] = Classify.find({level: 1})
  promiseArr[1] = Classify.find()
  return Promise.all(promiseArr)
      .then(([firstClassify, allClassify]) => {
        for (let i = 0, len = firstClassify.length; i < len; i++) {
          firstClassify[i].children = getClassifyChildrenDetail(firstClassify[i].children, allClassify)
        }
        return firstClassify
      })
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

function getRowObject (id) {
  return Classify.findById(id)
}

function deleteRowObject(id) {
  return Classify.findById(id)
      .then(classify => Classify.findByIdAndUpdate(classify.parent, {$pull: {children: id}}))
      .then(doc => {
        console.log('doc', doc)
        Classify.findByIdAndRemove(id).then(result => {
          for (let i = 0, len = result.children.length; i < len; i++) {
            deleteRowObject(result.children[i])
          }
      })
  })
}

function addRowObject (rowObj) {
  var item = new Classify({
    name: rowObj.name,
    level: 1,
    order: rowObj.order,
    showIndex: rowObj.showIndex
  })
  return item.save()
}

function addClassifyAndUpdateChildrenArray (rowObj) {
  return Classify.findById(rowObj.parent).then(result => {
    var item = new Classify({
      name: rowObj.name,
      level: result.level + 1,
      order: rowObj.order,
      parent: result._id,
      showIndex: rowObj.showIndex
    })
      return item.save()
    }).then(result => {
      return Classify.findByIdAndUpdate(result.parent, {$addToSet: {children: result._id}})
  })
}
