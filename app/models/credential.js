'use strict';

var mongoose = require('mongoose');
var DB = require('../common/db');
var U = require('../common/utils');

var credentialSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.ObjectId, ref: 'user'},
    fullname: String,
    username : String,
    email: String,
    password_salted: {type: String, select: false},
    created: Date,
    updated: Date
});

var model = mongoose.model('credential', credentialSchema, 'credential');

var Credential = function(model) {
    this.model = model;
};
Credential.prototype = new DB();

Credential.prototype.Register = function(data) {
    return this.Create(data);
};

Credential.prototype.Login = function(identity, password_salted) {
    var predicate = {$and: [
        {email: identity},
        {password_salted: password_salted}
    ]};
    var fields = 'user_id';
    return this.FindOne(predicate, fields)
    .then(function(ret) {
        if (!ret) {
            throw {type: U.C.UNAUTHORIZED};
        }
        else {
            if (!ret.user_id) {
                throw {type: U.C.DB_UNEXPECTED, msg: 'credential has no user_id'};
            }
            return {user_id: ret.user_id};
        }
    });
};

Credential.prototype.IsNewUser = function(data) {
    var identities = [];
    if (data.username) {
        identities.push({username: data.username});
    }
    if (data.email) {
        identities.push({email: data.email});
    }
    var predicate = {$or: identities};
    var fields = '_id';
    return this.FindOne(predicate, fields)
    .then(function(ret) {
        if (!ret) {
            return true;
        }
        else {
            return false;
        }
    });
};

Credential.prototype.FindByFbId = function(fb_id) {
    return this.FindOne({fb_id: fb_id}, 'user_id');
};

Credential.prototype.FindByGoogleId = function(google_id) {
    return this.FindOne({google_id: google_id}, 'user_id');
};

Credential.prototype.FindSocialInfoByUserId = function(user_id) {
    return this.FindOne({user_id: user_id}, 'fb_id');
};

module.exports = new Credential(model);