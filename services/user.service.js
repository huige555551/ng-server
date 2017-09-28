const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('../models/user.model');

mongoose.Promise = global.Promise;
const db = mongoose.connect(config.mongo.url, config.mongo.options).connection;

let service = {}
service.authenticate = authenticate;
service.getAll = getAll;

module.exports = service;

function authenticate (loginForm) {
  const username = loginForm.username;
  const password = loginForm.password;
  return User.findOne({
    username: username,
    password: password
  });
}

function getAll () {
  return User.find({});
}