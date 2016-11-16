var server = require('./common/server');
var socket = require('./common/socket')();


// var http = require('http');
// var app = require('./common/server')();

// var server = http.createServer(app);

// var io = require('socket.io')(server);
// var users = {};

// io.on('connection', function(socket){
// 	console.log('user connected');
// 	socket.on('message',function(data){
// 		console.log(data);
// 		socket.emit('test',data + '--------respond');
// 	});
// 	//when deliverer confirms an order, save the deliverer's socket
// 	socket.on('confirmation',function(data){
// 		var deliverer = data.split(',')[0];
// 		var orderer = data.split(',')[1];
// 		var orderId = data.split(',')[2];
// 		if(!users[deliverer]){
// 			users[deliverer] = socket;
// 		}
// 		users[orderer].emit('Order Taken','Your order has been taken by ' + deliverer);
// 		socket.on('deliverer',function(data){
// 			users[orderer].emit('deliverergo',data);
// 		});
// 	});

// 	//when orderer sends a request, save the orderer's socket
// 	socket.on('foodRequest',function(data){
// 		if(!users[data]){
// 			users[data] = socket;
// 		//	users[data].emit('');
// 		}
// 		console.log(data);
// 	});

// 	socket.on('disconnect', function(){
// 	    console.log('user disconnected');
// 	  });
// 	// console.log(socket.id);
// 	// socket.of('')
// //	io.emit('test', 'Eatey is Great!');
// });


server.listen(8000);
console.log('server started');
