const express = require('express');
const router = express.Router();
const config = require('../config.json');
const classifyService = require('../services/classify.service');
var classify = require("../models/classify.model.js");

// routes
// router.get('/logout', logout);
router.post('/add', addClassify);
router.get('/all', getAll);
router.delete('/delete/:id', deleteClassify);
router.get('/listParent', getParent);
router.get('/:id', getClassifyById);
router.put('/edit/:id', editClassify);


module.exports = router;

// middlewares
function getParent (req, res) {
  classifyService.getFirstCategories().then(firstCategories => {
    classifyService.getSecondCategories().then(secondCategories => {
      res.tools.setJson(200, '查询成功', {
            firstCategories: firstCategories,
            secondCategories: secondCategories
          })
    })
  })
}

function editClassify (req, res) {
  classifyService.editClassify(req.params.id, req.body)
    .then(classify => { res.tools.setJson(201, '编辑成功', classify)})
}

function getAll (req, res) {
  classifyService.getAll()
    .then(classify => { res.tools.setJson(200, '获取成功', classify) })
      .catch(err => { res.tools.setJson(400, err, '') })
}


function getClassifyById (req, res) {
  classifyService.getClassifyById(req.params.id)
      .then(result => res.tools.setJson(200, '获取成功', result))
      .catch(err => res.tools.setJson(400, err, ''))
}

function deleteClassify (req, res) {
  classifyService.deleteClassify(req.params.id)
      .then(result => res.tools.setJson(200, '删除成功', {}))
      .catch(err => res.tools.setJson(400, err, ''))
}

function addClassify (req, res) {
  if (!req.body.parent) {
    classifyService.addClassify(req.body)
        .then(result => res.tools.setJson(201, '新建成功', {pagingData: result}))
        .catch(err => res.tools.setJson(400, err, ''))
  } else {
    classifyService.addClassifyAndUpdateChildrenArray(req.body)
        .then(result => res.tools.setJson(201, '新建成功', {pagingData: result}))
        .catch(err => res.tools.setJson(400, err, ''))
  }
}