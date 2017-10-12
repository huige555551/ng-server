const express = require('express');
const router = express.Router();
const config = require('../config.json');
const specificationService = require('../services/specification.service');
const attributeService = require('../services/attribute.service');

// routes
router.post('/add', addRowObject);
router.get('/all', getAll);
router.get('/list', getList);
router.delete('/delete/:id', deleteRowObject);
router.get('/:id', getRowObject);
router.put('/edit/:id', editRowObject);


module.exports = router;

// middlewares

async function getList (req, res) {
  let perPage = parseInt(req.query.perPage),
      page = parseInt(req.query.page)
  try {
    for (let key in req.query) {
      if (!req.query[key] || key === 'perPage' || key === 'page') {
        delete req.query[key]
      }
    }
    res.tools.setJson(200, '获取成功', await specificationService.getList(req.query, perPage, page))
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}
function editRowObject (req, res) {
  specificationService.editRowObject(req.params.id, req.body)
      .then(result => res.tools.setJson(200, '编辑成功', result))
      .catch(err => res.tools.setJson(400, err, ''))
}

function getAll (req, res) {
  specificationService.getAll()
      .then(result => res.tools.setJson(200, '获取成功', {pagingData: result}))
      .catch(err => res.tools.setJson(400, err, ''))
}

function getRowObject (req, res) {
  specificationService.getRowObject(req.params.id)
      .then(result => res.tools.setJson(200, '获取成功', result))
      .catch(err => res.tools.setJson(400, err, ''))
}

function deleteRowObject (req, res) {
  specificationService.deleteRowObject(req.params.id)
      .then(result => res.tools.setJson(204, '删除成功', {}))
      .catch(err => res.tools.setJson(400, err, ''))
}

function addRowObject (req, res) {
  specificationService.addRowObject(req.body)
      .then(result => res.tools.setJson(200, '新建成功', result))
      .catch(err => res.tools.setJson(400, err, ''))
}