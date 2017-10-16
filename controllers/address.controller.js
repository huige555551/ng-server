const express = require('express')
const router = express.Router()
const config = require('../config.json')
const addressService = require('../services/address.service')
const address = require("../models/address.model.js")

// routes
router.post('/add', addRowObject)
router.get('/all', getAll)
router.get('/list', getList)
router.delete('/delete/:id', deleteRowObject)
router.get('/:id', getRowObject)
router.put('/edit/:id', editRowObject)


module.exports = router

// middlewares
async function editRowObject (req, res) {
  try {
    const result = await addressService.editRowObject(req.params.id, req.body)
    res.tools.setJson(201, '编辑成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function getList (req, res) {
  let perPage = parseInt(req.query.perPage),
      page = parseInt(req.query.page)
  try {
    res.tools.setJson(200, '获取成功', await addressService.getList(req.query, perPage, page))
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function getAll (req, res) {
  try {
    let classify = await addressService.getAll()
    res.tools.setJson(200, '获取成功', classify)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}


async function getRowObject (req, res) {
  try {
    let result = await addressService.getRowObject(req.params.id)
    res.tools.setJson(200, '获取成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function deleteRowObject (req, res) {
  try {
    let result = await addressService.deleteRowObject(req.params.id)
    res.tools.setJson(204, '删除成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function addRowObject (req, res) {
  try {
    let result = await addressService.addRowObject(req.body)
    res.tools.setJson(201, '新建成功', result)
  } catch (err) {
    console.log(err)
    res.tools.setJson(400, err, '')
  }
}