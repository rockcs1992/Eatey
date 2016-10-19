var _ = require('lodash');
var foodRequest = require('../models/foodrequest');
var U = require('../common/utils');

var foodRequest_api = {};
foodRequest_api.unsocketed = function(app) {
    app.post('/order/request', function(req, res) {
        res.Async(function *() {
        	console.log(req.body);
        	if (!req.Verify('selectedRestaurantId selectedFood destination waitingDuration tips')) {
                req.BadRequest('Bad order request');
            }

            var order = {};
            order.restaurant = req.body.selectedRestaurant;
            order.selectedFood = req.body.selectedFood[0] + ',' + req.body.selectedFood[1];
            order.totalPrice = req.body.totalPrice;
            order.destination = req.body.destination;
            order.waitingDuration = req.body.waitingDuration;
            order.tips = req.body.tips;

            var new_order = yield foodRequest.Create(order);
         	res.json(new_order);
        });
    }); 
};

// user_api.socketed = function(app, socket) {};

module.exports = foodRequest_api;