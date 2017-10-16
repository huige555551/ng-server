const router = require('express').Router()
const config = require('../config.json')
const jwt = require('jsonwebtoken')

const adminController = require('./admin.controller.js')
const authenticateController = require('./authenticate.controller')
const classifyController = require('./classify.controller')
const specificationController = require('./specification.controller')
const picController = require('./pic-upload.controller')
const productController = require('./product.controller')
const addressController = require('./address.controller')
const carouselController = require('./carousel.controller')
const featuredProductController = require('./featuredProduct.controller')
const permissionController = require('./permission.controller')
const roleController = require('./role.controller')


// function verifyToken(req, res, next) {
//   if (req.headers.token || req.query.token) {
//     // 如果有携带token,校验token是否合法`const token = req.headers.token || req.query.token;
//     jwt.verify(token, config.secret, (err, decoded) => {
//       if (err) {
//         res.send('服务器错误:', err)
//       }
//       if (decoded) {
//         next()
//       } else {
//         res.send('无效token')
//       }
//     })
//   } else {
//     // 不然提示需要携带token
//     res.send('该请求需要携带Token!')
//   }
// }

router.use('/auth', authenticateController)
router.use('/product/classify', classifyController)
router.use('/product/specification', specificationController)
router.use('/product', productController)
router.use('/pic', picController)
router.use('/address', addressController)
router.use('/carousel', carouselController)
router.use('/featuredProduct', featuredProductController)
router.use('/permission/admin', adminController)
router.use('/permission/role', roleController)
router.use('/permission', permissionController)

module.exports = router
