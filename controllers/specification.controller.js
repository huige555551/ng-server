const express = require('express');
const router = express.Router();
const config = require('../config.json');
const specificationService = require('../services/specification.service');
const attributeService = require('../services/attribute.service');

// routes
router.post('/add', addRowObject);
router.get('/all', getAll);
router.delete('/delete/:id', deleteRowObject);
router.get('/:id', getRowObject);
router.put('/edit/:id', editRowObject);


module.exports = router;

// middlewares
function editRowObject (req, res) {
  specificationService.editRowObject(req.params.id, req.body).then(result => {
    console.log('result', result)
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
      .catch(err => res.tools.setJson(400, err, ''))
}


function getRowObject (req, res) {
  specificationService.getRowObject(req.params.id).then(result => {
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

function deleteRowObject (req, res) {
  specificationService.deleteRowObject(req.params.id)
      .then(result => res.tools.setJson(204, '删除成功', {}))
      .catch(err => res.tools.setJson(400, err, ''))
}

function addRowObject (req, res) {
  specificationService.addRowObject(req.body)
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