var mongoose = require('mongoose'),
    config = require('../config')
/**
 * 连接
 */
// mongoose.connect(DB_URL);
const db = mongoose.connect(config.mongo.url, config.mongo.options).connection;


/**
* 连接成功
*/
mongoose.connection.on('connected', function () {    
console.log('Mongoose connection open to ' + config.mongo.url);  
});    

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);  
});    

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {    
console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;
