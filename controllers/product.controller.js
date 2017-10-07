const express = require('express');
const router = express.Router();
const config = require('../config.json');
const productService = require('../services/product.service');
const classifyService = require('../services/classify.service');


// routes
router.post('/add', addRowObject);
// router.get('/all', getAll);
// router.delete('/delete/:id', deleteRowObject);
// router.get('/listParent', getParent);
// router.get('/:id', getRowObject);
// router.put('/edit/:id', editRowObject);
//
//
module.exports = router;
//
// // middlewares
// function getParent (req, res) {
//   classifyService.getFirstCategories().then(firstCategories => {
//     classifyService.getSecondCategories().then(secondCategories => {
//       res.tools.setJson(200, '查询成功', {
//             firstCategories: firstCategories,
//             secondCategories: secondCategories
//           })
//     })
//   })
// }
//
// function editRowObject (req, res) {
//   classifyService.editRowObject(req.params.id, req.body)
//     .then(classify => { res.tools.setJson(201, '编辑成功', classify)})
// }
//
// function getAll (req, res) {
//   classifyService.getAll()
//     .then(classify => { res.tools.setJson(200, '获取成功', classify) })
//       .catch(err => { res.tools.setJson(400, err, '') })
// }
//
//
// function getRowObject (req, res) {
//   classifyService.getRowObject(req.params.id)
//       .then(result => res.tools.setJson(200, '获取成功', result))
//       .catch(err => res.tools.setJson(400, err, ''))
// }
//
// function deleteRowObject (req, res) {
//   classifyService.deleteRowObject(req.params.id)
//       .then(result => res.tools.setJson(204, '删除成功', {}))
//       .catch(err => res.tools.setJson(400, err, ''))
// }

function addRowObject (req, res) {
  console.log(req.body)
  // productService.addRowObject(req.body)
  // if (!req.body.parent) {
  //   classifyService.addRowObject(req.body)
  //       .then(result => res.tools.setJson(201, '新建成功', {pagingData: result}))
  //       .catch(err => res.tools.setJson(400, err, ''))
  // } else {
  //   classifyService.addClassifyAndUpdateChildrenArray(req.body)
  //       .then(result => res.tools.setJson(201, '新建成功', {pagingData: result}))
  //       .catch(err => res.tools.setJson(400, err, ''))
  // }
}