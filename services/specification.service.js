const config = require('../config.json');
const mongoose = require('mongoose');
const Specification = require('../models/specification.model');
const Attribute = require('../models/attribute.model');

mongoose.Promise = global.Promise;

let service = {}

service.getAll = getAll;
service.addRowObject = addRowObject;
service.deleteRowObject = deleteRowObject;
service.getRowObject = getRowObject;
service.editRowObject = editRowObject;

service.updateChildrenArray = updateChildrenArray;
service.getFirstCategories = getFirstCategories;
service.getSecondCategories = getSecondCategories;
service.addClassifyAndUpdateChildrenArray = addClassifyAndUpdateChildrenArray;
module.exports = service;

function getAll () {
  return Specification.find({}).populate({ path: 'valueArray'})
}

function addRowObject (rowObj) {
  let attributeDoc = JSON.parse(rowObj.valueArray)
  delete rowObj.valueArray
  let specificationDoc = new Specification(rowObj),
      rowObjectId
  return specificationDoc.save()
      .then(specification => {
        rowObjectId = specification._id
        return Attribute.insertMany(attributeDoc)
      })
      .then(attrArray => {
        let valueArray = []
        for (let i = 0; i < attrArray.length; i++) {
          valueArray.push(attrArray[i]._id)
        }
        return Specification.findByIdAndUpdate(rowObjectId, {$set: { valueArray: valueArray }})
      })
      .catch(err => console.log(err))
}

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
  let valueArray = JSON.parse(rowObj.valueArray),
      promiseAttributeArr = [],
      oldValueArray = []
  for (let i = 0; i < valueArray.length; i++) {
    if (valueArray[i]._id) {
      oldValueArray.push(valueArray[i]._id)
      promiseAttributeArr[i] = Attribute.findByIdAndUpdate(valueArray[i]._id, valueArray[i])
    } else {
      promiseAttributeArr[i] = Attribute.create(valueArray[i])
    }
  }
  promiseAttributeArr.push(
      Specification.findById(rowObj._id)
        .then(specification => {
          for (let i = 0, len = oldValueArray.length; i < len; i++) {
            let index = specification.valueArray.indexOf(oldValueArray[i])
            index === -1 ? '' : specification.valueArray.splice(index, 1)
          }
          return Attribute.remove({_id: specification.valueArray})
        })
  )
  return Promise.all(promiseAttributeArr)
      .then(attrs => {
        let valueArray = attrs.map(attr => attr._id)
        return Specification.findByIdAndUpdate(rowObj._id, {$set: Object.assign(rowObj, { valueArray:  valueArray})})
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
  return Specification.findById(id).populate({path: 'valueArray'})
}

function getAncestorId (parentId) {
  Classify.findById(parentId).then(doc => {
    return doc.parentId
  })
}

function deleteRowObject(id) {
  return Specification.findByIdAndRemove(id).then(removeObj => {
    let promiseArr = []
    for (let i = 0, len = removeObj.valueArray.length; i < len; i++) {
        promiseArr[i] = Attribute.findByIdAndRemove(removeObj.valueArray[i])
    }
    return Promise.all(promiseArr)
  })
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
