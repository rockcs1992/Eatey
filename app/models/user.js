var mongoose = require('mongoose');
var DB = require('../common/db');

// var orderSchema = new mongoose.Schema({
// 	startTime : Date.now(),
// 	orderType : String,    //   deliver/eat
// 	completed : Boolean,
// 	content : Array,    //   种类，数量
// 	tip : String,
// 	destination : String,
// 	course : String,
// 	price : String,
// 	orderer : String,
// 	deliverer : String,
// 	rating : Number,      //互评，对一单的评价
// 	comment : String

// });

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