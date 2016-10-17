var _ = require('lodash');
var Q = require('q');
var mongoose = require('mongoose');
var U = require('./utils');

/* mongodb interfaces */
var DB = function(model) {
    this.model = model;
};

/* generic operations */
DB.prototype.Create = function(data) {
    var d = Q.defer();
    if (!data._id) {
        data._id = mongoose.Types.ObjectId();
    }
    data.created = new Date();
    data.updated = data.created;
    this.model.findOneAndUpdate({_id: data._id}, {$set: data}, {upsert: true, new: true}, function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret);
        }
    });
    return d.promise;
};

DB.prototype.Create2 = function(update) {
    var d = Q.defer();
    var _id = mongoose.Types.ObjectId();
    update.$set.created = new Date();
    update.$set.updated = update.$set.created;
    this.model.findOneAndUpdate({_id: _id}, update, {upsert: true, new: true}, function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret);
        }
    });
    return d.promise;
};

DB.prototype.CreateMultiple = function(data) {
    var d = Q.defer();
    this.model.create(data, function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret);
        }
    });
    return d.promise;
};

DB.prototype.FindOne = function(predicate, fields) {
    var d = Q.defer();
    var query = this.model.findOne(predicate);
    if (fields) {
        query = query.select(fields);
    }
    query.exec(function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret);
        }
    });
    return d.promise;
};

DB.prototype.FindPopulated = function(predicate, populate, fields) {
    var d = Q.defer();
    this.model.findOne(predicate).select(populate).populate({path: populate+'._id', select: fields}).exec(function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret[populate]);
        }
    });
    return d.promise;
};

DB.prototype.Find = function(predicate, fields) {
    var d = Q.defer();
    var query = this.model.find(predicate);
    if (fields) {
        query = query.select(fields);
    }
    query.exec(function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret);
        }
    });
    return d.promise;
};

DB.prototype.Update = function(predicate, data) {
    var d = Q.defer();
    if (!data) {
        d.reject({type: U.C.BAD_REQUEST, msg: 'update with nothing'});
    }
    else {
        data.updated = new Date();
        this.model.findOneAndUpdate(predicate, data, {new: true}, function(e, ret) {
            if (e) {
                d.reject(e);
            }
            else {
                d.resolve(ret);
            }
        });
    }
    return d.promise;
};

DB.prototype.Erase = function() {
    var d = Q.defer();
    try {
        this.model.remove({}, function(e, ret) {
            if (e) {
                d.reject(e);
            }
            else {
                d.resolve(ret);
            }
        });
    }
    catch (err) {
        throw err;
    }
    return d.promise;
};

DB.prototype.Delete = function(predicate) {
    var d = Q.defer();
    try {
        this.model.remove(predicate, function(e, ret) {
            if (e) {
                d.reject(e);
            }
            else {
                d.resolve(ret);
            }
        });
    }
    catch (err) {
        throw err;
    }
    return d.promise;
};

DB.prototype.FindSubdocument = function(predicate, sub_predicate, arr) {
    var d = Q.defer();
    predicate[arr] = {$elemMatch: sub_predicate};
    this.model.findOne(predicate).select(arr).exec(function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            if (!ret || !ret[arr]) {
                d.resolve(null);
            }
            else {
                var index = _.findIndex(ret[arr], sub_predicate);
                d.resolve(ret[arr][index]);
            }
        }
    });
    return d.promise;
};

DB.prototype.Push = function(predicate, data, arr) {
    var d = Q.defer();
    if (!data) {
        d.reject({type: U.C.BAD_REQUEST});
    }
    else {
        this.model.findOne(predicate, function(e, doc) {
            if (e) {
                d.reject(e);
            }
            else {
                doc[arr].push(data);
                doc.save(function(e, doc) {
                    if (e) {
                        d.reject(e);
                    }
                    else {
                        d.resolve(doc);
                    }
                });
            }
        });
    }
    return d.promise;
};

DB.prototype.PushMultiple = function(predicate, data, arr) {
    var d = Q.defer();
    if (!data) {
        d.reject({type: U.C.BAD_REQUEST});
    }
    else {
        this.model.findOne(predicate, function(e, doc) {
            if (e) {
                d.reject(e);
            }
            else {
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        doc[arr].push(data[i]);
                    }
                }
                doc.save(function(e, doc) {
                    if (e) {
                        d.reject(e);
                    }
                    else {
                        d.resolve(doc);
                    }
                });
            }
        });
    }
    return d.promise;
};

DB.prototype.UpdateSubdocument = function(predicate, sub_id, data, arr) {
    var d = Q.defer();
    if (!data) {
        d.reject({type: U.C.BAD_REQUEST});
    }
    else {
        predicate[arr + '._id'] = sub_id;
        var operation = Object.keys(data)[0];
        var update = {};
        update[operation] = {};
        for (var key in data[operation]) {
            if (data[operation].hasOwnProperty(key)) {
                update[operation][arr + '.$.' + key] = data[operation][key];
            }
        }
        this.model.update(predicate, update, function(e) {
            if (e) {
                d.reject(e);
            }
            else {
                d.resolve(data);
            }
        });
    }
    return d.promise;
};

DB.prototype.DeleteSubdocument = function(_id, sub_id, arr) {
    var d = Q.defer();
    var update = {};
    update[arr] = {_id: sub_id};
    this.model.update({_id: _id}, {$pull: update}, function(e, ret) {
        if (e) {
            d.reject(e);
        }
        else {
            d.resolve(ret);
        }
    });

    return d.promise;
};

module.exports = DB;