const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('../models/user.model');

mongoose.Promise = global.Promise;
const db = mongoose.connect(config.mongo.url, config.mongo.options).connection;

let service = {}

service.getAll = getAll;

module.exports = service;

function getAll () {
  return User.find({});
}