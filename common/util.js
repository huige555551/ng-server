const qiniu = require('qiniu')
const config = require('../config')
var privateBucketDomain = config.privateBucketDomain
var accessKey = config.accessKey
var secretKey = config.secretKey

module.exports = {
    getPrivateDownloadUrl (key, fops) {
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var config = new qiniu.conf.Config();
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
        return bucketManager.privateDownloadUrl(privateBucketDomain, fops ? key + '?' + fops : key, deadline);
    }
}
