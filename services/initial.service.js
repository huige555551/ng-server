var mongoose = require('mongoose')
var config = require('../config.json')
var md5 = require('md5')
var Admin = require('../models/admin.model.js')
var Permission = require('../models/permission.model')

mongoose.Promise = global.Promise

let permissionList = [
  { name: '商品管理', identification: 'PRODUCT-MANAGEMENT', moduleName: '商品模块', sonAuthorityList: [
    { name: '商品列表', identification: 'PRODUCT-LIST', moduleName: '商品模块' },
    { name: '商品添加', identification: 'PRODUCT-ADD', moduleName: '商品模块' },
    { name: '商品修改', identification: 'PRODUCT-EDIT', moduleName: '商品模块' },
    { name: '商品删除', identification: 'PRODUCT-DELETE', moduleName: '商品模块' }]},
  { name: '分类管理', identification: 'CLASSIFY-MANAGEMENT', moduleName: '商品模块', sonAuthorityList: [
    { name: '分类列表', identification: 'CLASSIFY-LIST', moduleName: '商品模块' },
    { name: '分类添加', identification: 'CLASSIFY-ADD', moduleName: '商品模块' },
    { name: '分类修改', identification: 'CLASSIFY-EDIT', moduleName: '商品模块' },
    { name: '分类删除', identification: 'CLASSIFY-DELETE', moduleName: '商品模块' }]},
  { name: '规格管理', identification: 'SPECIFICATION-MANAGEMENT', moduleName: '商品模块', sonAuthorityList: [
    { name: '规格列表', identification: 'SPECIFICATION-LIST', moduleName: '商品模块' },
    { name: '规格添加', identification: 'SPECIFICATION-ADD', moduleName: '商品模块' },
    { name: '规格修改', identification: 'SPECIFICATION-EDIT', moduleName: '商品模块' },
    { name: '规格删除', identification: 'SPECIFICATION-DELETE', moduleName: '商品模块' }]},
  { name: '品牌管理', identification: 'BRAND-MANAGEMENT', moduleName: '商品模块', sonAuthorityList: [
    { name: '品牌列表', identification: 'BRAND-LIST', moduleName: '商品模块' },
    { name: '品牌添加', identification: 'BRAND-ADD', moduleName: '商品模块' },
    { name: '品牌修改', identification: 'BRAND-EDIT', moduleName: '商品模块' },
    { name: '品牌删除', identification: 'BRAND-DELETE', moduleName: '商品模块' }]},
  { name: '运费管理', identification: 'TRANSPORTATION-MANAGEMENT', moduleName: '商品模块', sonAuthorityList: [
    { name: '运费查看', identification: 'TRANSPORTATION-EDIT', moduleName: '商品模块' },
    { name: '运费修改', identification: 'TRANSPORTATION-EDIT', moduleName: '商品模块' }]},
  { name: '地址管理', identification: 'ADDRESS-MANAGEMENT', moduleName: '地址模块', sonAuthorityList: [
    { name: '地址列表', identification: 'ADDRESS-LIST', moduleName: '地址模块' },
    { name: '地址添加', identification: 'ADDRESS-ADD', moduleName: '地址模块' },
    { name: '地址修改', identification: 'ADDRESS-EDIT', moduleName: '地址模块' },
    { name: '地址删除', identification: 'ADDRESS-DELETE', moduleName: '地址模块' }]},
  { name: '快递单管理', identification: 'EXPRESS-MANAGEMENT', moduleName: '订单模块', sonAuthorityList: [
    { name: '快递单列表', identification: 'EXPRESS-LIST', moduleName: '订单模块' },
    { name: '快递单添加', identification: 'EXPRESS-ADD', moduleName: '订单模块' },
    { name: '快递单修改', identification: 'EXPRESS-EDIT', moduleName: '订单模块' },
    { name: '快递单删除', identification: 'EXPRESS-DELETE', moduleName: '订单模块' }]},
  { name: '订单管理', identification: 'ORDER-MANAGEMENT', moduleName: '订单模块', sonAuthorityList: [
    { name: '订单列表', identification: 'ORDER-LIST', moduleName: '订单模块' },
    { name: '订单添加', identification: 'ORDER-ADD', moduleName: '订单模块' },
    { name: '订单修改', identification: 'ORDER-EDIT', moduleName: '订单模块' },
    { name: '订单状态修改', identification: 'ORDER-STATUS-EDIT', moduleName: '订单模块' },
    { name: '订单详情', identification: 'ORDER-DETAIL', moduleName: '订单模块' },
    { name: '订单退款操作', identification: 'ORDER-REFUND', moduleName: '订单模块' }]},
  { name: '退款申请单管理', identification: 'REFUNDORDER-MANAGEMENT', moduleName: '订单模块', sonAuthorityList: [
    { name: '退款申请单列表', identification: 'REFUNDORDER-LIST', moduleName: '订单模块' },
    { name: '退款申请单添加', identification: 'REFUNDORDER-ADD', moduleName: '订单模块' },
    { name: '退款申请单修改', identification: 'REFUNDORDER-EDIT', moduleName: '订单模块' },
    { name: '退款申请单删除', identification: 'REFUNDORDER-DELETE', moduleName: '订单模块' },
    { name: '退款申请单详情', identification: 'REFUNDORDER-DETAIL', moduleName: '订单模块' }]},
  { name: '管理员管理', identification: 'ADMIN-MANAGEMENT', moduleName: '权限模块', sonAuthorityList:[
    { name: '管理员列表', identification: 'ADMIN-LIST', moduleName: '权限模块' },
    { name: '管理员添加', identification: 'ADMIN-ADD', moduleName: '权限模块' },
    { name: '管理员修改', identification: 'ADMIN-EDIT', moduleName: '权限模块' },
    { name: '管理员删除', identification: 'ADMIN-DELETE', moduleName: '权限模块' },
    { name: '管理员详情', identification: 'ADMIN-DETAIL', moduleName: '权限模块' }]},
  { name: '角色管理', identification: 'ROLE-MANAGEMENT', moduleName: '权限模块', sonAuthorityList:[
    { name: '角色列表', identification: 'ROLE-LIST', moduleName: '权限模块' },
    { name: '角色添加', identification: 'ROLE-ADD', moduleName: '权限模块' },
    { name: '角色修改', identification: 'ROLE-EDIT', moduleName: '权限模块' },
    { name: '角色删除', identification: 'ROLE-DELETE', moduleName: '权限模块' },
    { name: '角色详情', identification: 'ROLE-DETAIL', moduleName: '权限模块' }]}
]

async function createAdmin() {
  var admin = new Admin({
    username: 'admin',
    password: md5('123456')
  });
  return await admin.save()
}

async function initialDB() {
  //初始化权限
  for (let i = 0, len = permissionList.length; i < len; i++) {
    await Permission.update({ identification: permissionList[i].identification}, permissionList[i], {upsert: true})
    let parent = await Permission.findOne({ identification: permissionList[i].identification })
    for (let j = 0, len2 = permissionList[i].sonAuthorityList.length; j < len2; j++) {
      await Permission.update({identification: permissionList[i].sonAuthorityList[j].identification}, Object.assign(permissionList[i].sonAuthorityList[j], {parentId: parent._doc._id}), {upsert: true})
    }
  }
  let user = await Admin.findOne({
    username: 'admin'
  })
  if(user) {
    return '系统管理员已存在!'
  } else {
    let doc = await createAdmin()
    if (doc) {
      return '系统管理员新建成功!'
    }
  }

}

module.exports = initialDB