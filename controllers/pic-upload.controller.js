const express = require('express')
const router = express.Router()
const qiniu = require('qiniu')
const config = require('../config')
var accessKey = config.accessKey
var secretKey = config.secretKey
var bucket = config.bucket
var expiress = config.expiress
var privateBucketDomain = config.privateBucketDomain

// routes
router.get('/getUploadToken', getUploadToken);
router.get('/getPrivateDownloadUrl', getPrivateDownloadUrl);
router.get('/getBucketDomainAndToken', getBucketDomainAndToken)

module.exports = router;

// middlewares
function getToken() {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  var options = {
    scope: bucket,
    expiress: 3600
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}
function getUploadToken (req, res) {
  res.tools.setJson(200, '', { uploadToken: getToken() })
}

function getPrivateDownloadUrl (req, res) {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
  var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, req.query.key, deadline);
  res.tools.setJson(200, '上传成功', { privateDownloadUrl: privateDownloadUrl})
}

function getBucketDomainAndToken (req, res) {
  res.tools.setJson(200, '', { uploadToken: getToken(), bucketPort: bucket})
}