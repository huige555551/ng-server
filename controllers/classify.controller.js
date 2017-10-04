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
      res.json({
        status: {
          errCode: 200,
          message: '查询成功'
        },
        data: {
          firstCategories: firstCategories,
          secondCategories: secondCategories
        }
      })
    })
  })
}

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
  classifyService.getAll()
    .then(classify => {
      res.json({
        status: {
          errCode: 200,
          message: '获取成功'
        },
        data: classify
      })
    }).catch(err => {
      console.dir(err)
      res.json({
        status: {
          errCode: 300,
          message: new Error(err)
        }
      })
    })
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

function deleteClassify (req, res) {
  classifyService.deleteClassify(req.params.id).then(result => {
    res.json({
      status: {
        errCode: 200,
        message: '删除成功'
      }
    })
  }
  )
}

function addClassify (req, res) {
  if (!req.body.parentId) {
    classifyService.addClassify(req.body)
        .then(result => {
          res.json({
            status: {
              errCode: 200,
              message: '新建成功'
            }
          });
        })
        .catch(err =>
          res.json({
            status: {
              errCode: 300,
              message: err
            }
          }))
  } else {
    classifyService.addClassifyAndUpdateChildrenArray(req.body).then(result => {
      res.json({
        status: {
          errCode: 200,
          message: '新建成功'
        }
      });
    })
  }
}