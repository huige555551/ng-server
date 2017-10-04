const express = require('express');
const router = express.Router();
const config = require('../config.json');
const specificationService = require('../services/specification.service');
const attributeService = require('../services/attribute.service');
var classify = require("../models/classify.model.js");

// routes
router.post('/add', addSpecification);
router.get('/all', getAll);
router.delete('/delete/:id', deleteSpecification);
router.get('/:id', getClassifyById);
router.put('/edit/:id', editClassify);


module.exports = router;

// middlewares
function editClassify (req, res) {
  classifyService.editClassify(req.params.id, req.body).then(result => {
    res.json({
      status: {
        errCode: 200,
        message: '编辑成功'
      },
      data: result
    })
  })
}

function getAll (req, res) {
  specificationService.getAll()
      .then(result => res.tools.setJson(200, '获取成功', {pagingData: result}))
      .catch(err => res.tools.setJson(400, new Error(err), ''))
}


function getClassifyById (req, res) {
  classifyService.getClassifyById(req.params.id).then(result => {
    res.json({
      status: {
        errCode: 200
      },
      data: result
    })
  }).catch(err => {
    res.json({
      status: {
        errCode: 300,
        message: '获取失败'
      }
    })
  })
}

function deleteSpecification (req, res) {
  classifyService.deleteSpecification(req.params.id).then(result => {
    res.json({
      status: {
        errCode: 200,
        message: '删除成功'
      }
    })
  }
  )
}

function addSpecification (req, res) {
  specificationService.addSpecification(req.body)
      .then(result => {
        res.json({
          status: {
            errCode: 200,
            message: '新建成功'
          },
          data: result
        });
      })
      .catch(err =>
          res.json({
            status: {
              errCode: 300,
              message: err
            }
          }))
}