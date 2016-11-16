var _ = require('lodash');
var FoodRequest = require('../models/foodrequest');
var U = require('../common/utils');
var requestCache = [];
var jwt = require('jsonwebtoken');

var foodRequest_api = {};
foodRequest_api.unsocketed = function(app) {
    app.post('/order/request', function(req, res) {
        res.Async(function *() {
            try {
                var decoded = jwt.verify(req.headers.authorization, 'secret');
            }catch(err) {
               res.status(401).json({m: U.C.UNAUTHORIZED});
            }
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
            order.orderer = decoded.username;
            order.expired = false;

            var new_order = yield FoodRequest.Create(order);
            requestCache.push(new_order);
            setTimeout(setExpire.bind(new_order),Number(new_order.waitingDuration)* 1000);
          //  console.log(+new_order.created + new_order.waitingDuration * 1000);
            new_order.expireAt = new Date(+new_order.created + new_order.waitingDuration * 1000).toLocaleTimeString();
           
         	res.json(new_order);
        });
    }); 

    app.get('/order/get', function(req, res) {
        try {
            jwt.verify(req.headers.authorization, 'secret');
        }catch(err) {
           res.status(401).json({m: U.C.UNAUTHORIZED});
        }
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