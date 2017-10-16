const config = require('../config.json')
const mongoose = require('mongoose')
const Product = require('../models/product.model')
const ProductAttr = require('../models/product_attr.model')
const util = require('../common/util')
mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.searchName = searchName
service.getList = getList
service.editRowObject = editRowObject
service.addRowObject = addRowObject
service.deleteRowObject = deleteRowObject
service.getRowObject = getRowObject

service.updateChildrenArray = updateChildrenArray
service.getFirstCategories = getFirstCategories
service.getSecondCategories = getSecondCategories
service.addClassifyAndUpdateChildrenArray = addClassifyAndUpdateChildrenArray

module.exports = service

async function searchName(req, name) {
  let result = await Product.find({name: name})
  return result
}

async function getList(query, perPage, page) {
  let pagingData = await Product.find(query).skip(perPage*page).limit(perPage).sort({update_at: 'desc'}),
    total = await Product.count(query)
  for (let i = 0, len = pagingData.length; i < len; i += 1) {
    pagingData[i]._doc.stock = 0
    pagingData[i]._doc.sales = 0
    pagingData[i]._doc.cover = util.getPrivateDownloadUrl(pagingData[i].images[0], 'imageView2/2/w/200/h/100')
    console.log(pagingData[i]._doc.cover)
    for (let j = 0, len = pagingData[i].productAttrs.length; j < len; j += 1) {
      pagingData[i]._doc.stock += pagingData[i].productAttrs[j].stock
      pagingData[i]._doc.sales += pagingData[i].productAttrs[j].sales
    }
  }
  return {pagingData, total, page: page + 1}
}

function updateChildrenArray(fatherId, childId) {
  return Classify.findByIdAndUpdate(fatherId, {$addToSet: {children: childId}})
}

function getFirstCategories() {
  return Classify.find({'level': 1})
}

function getSecondCategories() {
  return Classify.find({'level': 2})
}

async function addRowObject(rowObj) {
  var productItem = new Product(rowObj)
  return await productItem.save()
}

async function editRowObject(id, rowObj) {
  rowObj.update_at = Date.now()
  // 更新product
  return await Product.findByIdAndUpdate(rowObj._id, rowObj)
}

async function getAll() {
  const result = await Product.find()
  return result
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

async function getRowObject(id) {
  const product = await Product.findById(id)
  product._doc.images = product._doc.images.map(image => {
    return {
      url: util.getPrivateDownloadUrl(image),
      key: image
    }
  })
  return product
}

function deleteRowObject(id) {
  return Classify.findById(id)
      .then(classify => Classify.findByIdAndUpdate(classify.parent, {$pull: {children: id}}))
      .then(doc => {
        Classify.findByIdAndRemove(id).then(result => {
          for (let i = 0, len = result.children.length; i < len; i++) {
            deleteRowObject(result.children[i])
          }
      })
  })
}



function addClassifyAndUpdateChildrenArray(rowObj) {
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
