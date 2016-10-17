var _ = require('lodash');
var User = require('../models/user');
var U = require('../common/utils');

var user_api = {};
user_api.unsocketed = function(app) {
    app.get('/user/get', function(req, res) {
        res.Async(function *() {
            var user = yield User.Find();
            res.json(user);
        });
    }); 
};

// user_api.socketed = function(app, socket) {};

module.exports = user_api;