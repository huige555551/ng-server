const config = require('../config.json')
const mongoose = require('mongoose')
const Permission = require('../models/permission.model')

mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.getList = getList
service.editRowObject = editRowObject
service.addRowObject = addRowObject
service.deleteRowObject = deleteRowObject
service.getRowObject = getRowObject

module.exports = service

async function getAll() {
  let result = []
  let modules = await Permission.find().exists('parentId', false).sort({moduleName: 1})
  for (let i = 0, len = modules.length; i < len; i++) {
    modules[i]._doc.sonAuthorityList = await Permission.find({parentId: modules[i]._doc._id})
  }
  for (let i = 0, len = modules.length; i < len; i++) {
    if (result.length > 0 && result[result.length - 1].moduleName && result[result.length - 1].moduleName === modules[i].moduleName) {
      result[result.length - 1].array.push(modules[i])
    } else {
      result.push({
        moduleName: modules[i].moduleName,
        array: [modules[i]]
      })
    }
  }
  return result
}

async function getList(query, perPage, page) {
  let result = {}
  result.pagingData = await Permission.find().skip(perPage * (page - 1)).limit(perPage).sort({update_at: 'desc'})
  result.total = await Permission.count()
  result.page = page
  return result
}

async function editRowObject(id, rowObj) {
  if (rowObj.defaultUse === 'true') {
    await Permission.updateMany({defaultUse: true}, {$set: {'defaultUse': false}})
  }
  const result = await Permission.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getRowObject(id) {
  return await Permission.findById(id)
}

async function deleteRowObject(id) {
  return await Permission.findByIdAndRemove(id)
}

async function addRowObject(rowObj) {
  if (rowObj.defaultUse === 'true') {
    await Permission.updateMany({defaultUse: true}, {$set: {'defaultUse': false}})
  }
  var item = new Permission(rowObj)
  return await item.save()
}

