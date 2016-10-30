var _ = require('lodash');
var FoodRequest = require('../models/foodrequest');
var U = require('../common/utils');
var requestCache = [];

var foodRequest_api = {};
foodRequest_api.unsocketed = function(app) {
    app.post('/order/request', function(req, res) {
        res.Async(function *() {
        	if (!req.Verify('selectedRestaurantId selectedFood destination totalPrice waitingDuration tips')) {
                req.BadRequest('Bad order request');
            }

            var order = {};
            order.restaurant = req.body.selectedRestaurant;
            order.selectedFood = req.body.selectedFood[0] + ',' + req.body.selectedFood[1];
            order.totalPrice = req.body.totalPrice;
            order.destination = req.body.destination;
            order.waitingDuration = req.body.waitingDuration;
            order.tips = req.body.tips;
            order.expired = false;

            var new_order = yield FoodRequest.Create(order);
            requestCache.push(new_order);
            setTimeout(setExpire.bind(new_order),Number(new_order.waitingDuration)* 1000);
         	res.json(new_order);
        });
    }); 

    app.get('/order/get', function(req, res) {
        // res.Async(function *() {
        //     // var orders = yield FoodRequest.Find();
        //     res.json(orders);
        // });
        res.json(requestCache);
    }); 
};

function setExpire(){
    //TODO : Use either hashmap or binary search for searching expired request
    for(let i = 0;i<requestCache.length;i++){
        if(requestCache[i]._id.toString() === this._id.toString()){
            requestCache.splice(i,1);
            break;
        }
    }
    FoodRequest.Update({_id:this._id},{expired : true});
}

module.exports = foodRequest_api;