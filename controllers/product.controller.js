const express = require('express');
const router = express.Router();
const config = require('../config.json');
const productService = require('../services/product.service');

// routes
router.post('/add', addRowObject);
router.get('/list', getList);
router.get('/all', getAll);
router.get('/searchName', searchName);
// router.delete('/delete/:id', deleteRowObject);
// router.get('/listParent', getParent);
router.get('/:id', getRowObject);
router.put('/edit/:id', editRowObject);
//
//
module.exports = router;

// middlewares
async function searchName(req, res) {
  try {
    res.tools.setJson(200, '获取成功', await productService.searchName(req, req.query.name))
  } catch (err) {
    console.log(err)
    res.tools.setJson(400, err, '')
  }
}

async function getList (req, res) {
  try {
    let perPage = parseInt(req.query.perPage)
        page = parseInt(req.query.page) - 1
    for (let key in req.query) {
      if (!req.query[key] || key === 'perPage' || key === 'page') {
        delete req.query[key]
      }
    }
    res.tools.setJson(200, '获取成功', await productService.getList(req.query, perPage, page))
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

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
function editRowObject (req, res) {
  try {
    res.tools.setJson(201, '获取成功', productService.editRowObject(req.params.id, req.body))
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}

async function getAll (req, res) {
  try {
    let result = await productService.getAll()
    res.tools.setJson(200, '获取成功', result)
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}


async function getRowObject (req, res) {
  try {
    res.tools.setJson(200, '获取成功', productService.getRowObject(req.params.id))
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}
//
// function deleteRowObject (req, res) {
//   classifyService.deleteRowObject(req.params.id)
//       .then(result => res.tools.setJson(204, '删除成功', {}))
//       .catch(err => res.tools.setJson(400, err, ''))
// }

async function addRowObject (req, res) {
  try {
    res.tools.setJson(201, '新建成功', await productService.addRowObject(req.body))
  } catch (err) {
    console.log(err)
    res.tools.setJson(400, err, '')
  }
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