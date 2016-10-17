var express 	   = require('./extended_express');
var app 		   = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var U              = require('./utils');
var session        = require('express-session');
var path           = require('path');


module.exports = function(){
    mongoose.Promise = require('q').Promise;
    mongoose.connect("mongodb://localhost/eatey", {
        server: {
            poolSize: 5, // Number of connections in the connection pool for each server instance
            reconnectTries: Number.MAX_VALUE, // never stop reconnecting
            reconnectInterval: 5000
        }
    });
	var html_path = 'client';
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.json()); // for parsing application/json
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(express.static(path.resolve(__dirname + '/../../' + html_path))); // set the static files location

    app.use(function(req, res, next) {
        if (!req.url.startsWith('/api/')) {
            res.sendFile(path.resolve(__dirname + '/../../' + html_path + '/index.html'));
        }
        else {
            next();
        }
    });


    var router = express.Router();
    var routes = 'user credential';
    routes.split(' ').forEach(function(route) {
        require(path.resolve(__dirname + '/../routes/' + route)).unsocketed(router);
    });
    app.use(U.C.API_BASE, router);

    return app;
};