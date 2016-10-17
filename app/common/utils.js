var crypto = require('crypto');
var U = {};
U.H = {};

/* constants */
U.C = {
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    BAD_REQUEST: 'Bad Request',
    SERVER_ERROR: 'Internal Server Error',
    DB_UNEXPECTED: 'DB Unexpected Error',
    NOT_FOUND: 'Not Found',
    UNKNOWN: 'Unknown',
    ALREADY_EXIST: 'Found',
    LOG_OUT: 'Log Out',
    OK: 'OK',
    API_BASE: '/api'
};

U.H.salt = function(password) {
    var shasum = crypto.createHash('sha1');
    shasum.update(password);
    return shasum.digest('hex');
};

U.H.new_id = function() {
    return require('mongoose').Types.ObjectId();
};

module.exports = U;