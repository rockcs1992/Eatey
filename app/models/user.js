var mongoose = require('mongoose');
var DB = require('../common/db');

var userSchema = new mongoose.Schema({
    fullname: String,
    avatar : String,
    username : String,
    password : String,
    aveRating : Number,
    token : String
});

var model = mongoose.model('user', userSchema, 'user');

var User = function(model) {
    this.model = model;
};
User.prototype = new DB();

User.prototype.FindById = function(_id, fields) {
    return this.FindOne({_id: _id}, fields);
};

module.exports = new User(model);