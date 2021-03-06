const express = require('express')
const router = express.Router()
const config = require('../config.json')
const featuredProduct = require('../services/featuredProduct.service')

// routes
router.post('/add', addRowObject)
router.get('/all', getAll)
router.get('/list', getList)
router.delete('/delete/:id', deleteRowObject)
router.get('/:id', getRowObject)
router.put('/edit/:id', editRowObject)


module.exports = router

// middlewares
async function editRowObject(req, res) {
  try {
    const result = await featuredProduct.editRowObject(req.params.id, req.body)
    res.tools.setJson(201, '编辑成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function getList(req, res) {
  let perPage = parseInt(req.query.perPage),
    page = parseInt(req.query.page)
  try {
    res.tools.setJson(200, '获取成功', await featuredProduct.getList(req.query, perPage, page))
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function getAll(req, res) {
  try {
    let result = await featuredProduct.getAll()
    res.tools.setJson(200, '获取成功', result)
  } catch (err) {
    console.log(err)
    res.tools.setJson(400, err, '')
  }
}


async function getRowObject(req, res) {
  try {
    let result = await featuredProduct.getRowObject(req.params.id)
    res.tools.setJson(200, '获取成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function deleteRowObject(req, res) {
  try {
    let result = await featuredProduct.deleteRowObject(req.params.id)
    res.tools.setJson(204, '删除成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function addRowObject(req, res) {
  try {
    let result = await featuredProduct.addRowObject(req.body)
    res.tools.setJson(201, '新建成功', result)
  } catch (err) {
    console.log(err)
    res.tools.setJson(400, err, '')
  }
}