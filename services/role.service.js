const config = require('../config.json')
const mongoose = require('mongoose')
const Role = require('../models/role.model')

mongoose.Promise = global.Promise

let service = {}

service.getAll = getAll
service.getList = getList
service.editRowObject = editRowObject
service.addRowObject = addRowObject
service.deleteRowObject = deleteRowObject
service.getRowObject = getRowObject

module.exports = service

async function getList(query, perPage, page) {
  let result = {}
  result.pagingData = await Address.find().skip(perPage * (page - 1)).limit(perPage).sort({update_at: 'desc'})
  result.total = await Address.count()
  result.page = page
  return result
}

async function editRowObject(id, rowObj) {
  const result = await Role.findByIdAndUpdate(id, Object.assign(rowObj, {update_at: Date.now()}))
  return result
}

async function getAll() {
  return await Role.find()
}

async function getRowObject(id) {
  return await Role.findById(id).populate({path: 'permissionList', select: '_id'})
}

async function deleteRowObject(id) {
  return await Role.findByIdAndRemove(id)
}

async function addRowObject(rowObj) {
  let item = new Role(rowObj)
  return await item.save()
}

