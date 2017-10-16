const express = require('express')
const router = express.Router()
const config = require('../config.json')
const authService = require('../services/authenticate.service')
const adminService = require('../services/admin.service')
const _ = require('lodash')
// routes
// /api/auth/login
router.post('/login', authenticate)
router.post('/logout', logout)
router.get('/isLogin', isLogin)

module.exports = router

// middleware
async function isLogin(req, res) {
  if (req.session.user) {
    const userInfo = await adminService.getRowObjectByName({
      username: req.session.user.username
    })
    res.tools.setJson(200, '已经登陆', userInfo)
  } else {
    res.tools.setJson(10010, '未登陆', '未登陆')
  }
}
function logout(req, res) {
  delete req.session.user
  res.tools.setJson(200, '登出成功', '')
}

async function authenticate(req, res) {
  const username = req && req.body.username
  const password = req && req.body.password
  try {
    const userInfo = await authService.authenticate({
      username: username,
      password: password
    })
    if (_.isObject(userInfo)) {
      req.session.user = userInfo
      res.tools.setJson(200, '登陆成功', userInfo)
    } else if (_.isString(userInfo)){
      if (userInfo === '用户名不存在') {
        res.tools.setJson(404, '用户名不存在', '')
        // res.sendStatus(404).send(userInfo);
      } else if (userInfo === '密码错误') {
        res.tools.setJson(401, '密码错误', '')
        // res.sendStatus(401).send(userInfo);
      } else {
        res.tools.setJson(400, '', '')
      }
    }
  } catch (err) {
    res.tools.setJson(400, err, '')
  }
}
