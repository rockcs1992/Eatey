var http = require('http');
var app = require('./common/server')();

http.createServer(app).listen(8000);
console.log('server started');