var express = require('express');
var Q = require('q');
var U = require('./utils');

express.response.HandleError = function(err) {
    if (!err.type) {
        console.log(err);
        this.status(500).json(U.C.SERVER_ERROR);
    }
    else if (err.type === U.C.UNAUTHORIZED) {
        this.status(401).json(U.C.UNAUTHORIZED);
    }
    else if (err.type === U.C.BAD_REQUEST) {
        // bad request is deemed to have come from hackers, need to record their IP and user info
        console.log(err.msg);
        this.status(400).json(U.C.BAD_REQUEST);
    }
    else if (err.type === U.C.SERVER_ERROR) {
        // server error refers to issues such as file not found, connection lost, etc
        console.log(err.msg);
        this.status(500).json(U.C.SERVER_ERROR);
    }
    else if (err.type === U.C.DB_UNEXPECTED) {
        // db unexpected refers to some db configuration is different from what we think it is - that's serious!
        console.log(err.msg);
        this.status(500).json(U.C.DB_UNEXPECTED);
    }
    else if (err.type === U.C.NOT_FOUND) {
        this.status(404).json(U.C.NOT_FOUND);
    }
    else if (err.type === U.C.ALREADY_EXIST) {
        this.status(302).json(U.C.ALREADY_EXIST);
    }
    else if (err.type === U.C.FORBIDDEN) {
        this.status(403).json(U.C.FORBIDDEN);
    }
};

express.response.Async = function(f) {
    var thisClass = this;
    return Q.async(f)()
    .catch(function(err) {
        thisClass.HandleError(err);
    });
};

express.request.Verify = function(required_params) {
    var query = this.body;
    required_params = required_params.split(' ');
    for (var i=0; i<required_params.length; i++) {
        var param = required_params[i];
        if (query[param] === null) {
            return false;
        }
    }
    return true;
};

express.request.BadRequest = function(msg) {
    throw {type: U.C.BAD_REQUEST, msg: msg + ' from ' + this.connection.remoteAddress};
};

module.exports = express;