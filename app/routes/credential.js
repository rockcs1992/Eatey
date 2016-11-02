var _ = require('lodash');
var U = require('../common/utils');
var Credential = require('../models/credential');
var User = require('../models/user');
var jwt = require('jsonwebtoken');


var credential_api = {};
credential_api.unsocketed = function(app){
	app.post('/register', function(req, res) {
		res.Async(function *() {
            if (!req.Verify('email password firstname lastname username')) {
                req.BadRequest('register attempt');
            }

            var credential = {};
            credential.email = req.body.email.trim();
            credential.username = req.body.username;
            credential.fullname = req.body.firstname + ' ' + req.body.lastname;
            credential.password_salted = U.H.salt(req.body.password);
            credential.user_id = U.H.new_id();

            var isNewUser = yield Credential.IsNewUser(credential);
            if (!isNewUser) {
            	throw {type: U.C.ALREADY_EXIST};
            }
            else{
            	var data = yield Credential.Register(credential);
   			

	            var user = {};
	            user._id = data.user_id;
	            user.fullname = req.body.firstname + ' ' + req.body.lastname;
	            user.username = req.body.username;
	        
	            if (!_.isUndefined(req.body.avatar)) {
	                user.avatar = req.body.avatar;
	            }
                user.token = jwt.sign({username:user.username,_id:user._id},'secret',{expiresIn: '30 days'});
	            var new_user = yield User.Create(user);
             
            //    var token = jwt.sign(new_user,String(new_user._id),{expiresIn: '2 days'});
	        //    req.session._id = credential.user_id;
	         //   res.json({token:token});
             //   console.log(token);
	         	 res.json({token : new_user.token});
	        }

   			
        });
	});

	app.post('/login', function(req, res) {
        res.Async(function *() {

            if (!req.Verify('email password')) {
                req.BadRequest('login attempt');
            }

            var credential = yield Credential.Login(req.body.email.trim(), U.H.salt(req.body.password));

        
            var fields = 'username token'; // need to be the same as /user/get so front end can cache login's result
            var user = yield User.FindById(credential.user_id, fields);
            user.token = jwt.sign({username:user.username,_id:user._id},'secret',{expiresIn: '30 days'});
           res.json({token : user.token,username:user.username});
           //   res.json({token:token});
        });
    });

    app.post('/logintest', function(req, res) {
        res.Async(function *() {
            try {
                var decoded = jwt.verify(req.headers.authorization, 'secret');
            }catch(err) {
               res.status(401).json({m: U.C.UNAUTHORIZED});
            }
            var user = yield User.FindById(decoded._id,'username');

            
            res.json(user);
        });
    });
};


module.exports = credential_api;
