var mongoose = require('mongoose');
var DB = require('../common/db');

var orderSchema = new mongoose.Schema({
	restaurant : String,
	selectedFood : String,
	totalPrice : Number,
	destination : String,
	waitingDuration : String,
	tips : Number,
//	startTime : Date.now(),
	orderer : String,
	expired : Boolean,
	completed : Boolean,
	created: Date,
	deliverer : String,
	expireAt : String
	
	// orderType : String,    //   deliver/eat
	// completed : Boolean,
	// orderer : String,
	// deliverer : String,
	// rating : Number,      //互评，对一单的评价
	// comment : String

});

var model = mongoose.model('foodRequest', orderSchema, 'foodRequest');

var foodRequest = function(model) {
    this.model = model;
};
foodRequest.prototype = new DB();

module.exports = new foodRequest(model);