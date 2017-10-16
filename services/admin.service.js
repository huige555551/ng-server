const config = require('../config.json')
const mongoose = require('mongoose')
const Admin = require('../models/admin.model.js')

mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.getList = getList
service.editRowObject = editRowObject
service.addRowObject = addRowObject
service.deleteRowObject = deleteRowObject
service.getRowObject = getRowObject
service.getRowObjectByName = getRowObjectByName

module.exports = service

async function getList(query, perPage, page) {
  let result = {}
  result.pagingData = await Admin.find().populate('role').skip(perPage * (page - 1)).limit(perPage).sort({update_at: 'desc'})
  result.total = await Admin.count()
  result.page = page
  return result
}

async function editRowObject(id, rowObj) {
  if (rowObj.defaultUse === 'true') {
    await Admin.updateMany({defaultUse: true}, {$set: {'defaultUse': false}})
  }
  const result = await Admin.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getAll() {
  const result = await Admin.find()
  return result
}

async function getRowObject(id) {
  return await Admin.findById(id).populate({ path: 'role', populate: { path: 'permissionList' }})
}

async function getRowObjectByName(name) {
  return await Admin.findOne(name)
}

async function deleteRowObject(id) {
  return await Admin.findByIdAndRemove(id)
}

async function addRowObject(rowObj) {
  if (rowObj.defaultUse === 'true') {
    await Admin.updateMany({defaultUse: true}, {$set: {'defaultUse': false}})
  }
  var item = new Admin(rowObj)
  return await item.save()
}

