var _ = require('lodash');
var U = require('../common/utils');
var Credential = require('../models/credential');
var User = require('../models/user');

var credential_api = {};
credential_api.unsocketed = function(app){
	app.post('/register', function(req, res) {
		res.Async(function *() {
            if (!req.Verify('email password firstname lastname username')) {
                req.BadRequest('register attempt');
            }

            var credential = {};
            credential.email = req.body.email;
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
	            var new_user = yield User.Create(user);

	        //    req.session._id = credential.user_id;
	            res.json({user_id: new_user._id});
	         	// res.json(new_user);
	        }

   			
        });
	});

	app.post('/login', function(req, res) {
            console.log(req.body);
        res.Async(function *() {

            if (!req.Verify('email password')) {
                req.BadRequest('login attempt');
            }

            var credential = yield Credential.Login(req.body.email, U.H.salt(req.body.password));

        //    req.session._id = credential.user_id;
            var fields = 'username'; // need to be the same as /user/get so front end can cache login's result
            var user = yield User.FindById(credential.user_id, fields);
            res.json(user);
        });
    });

    app.post('/logout', function(req, res){
        delete req.session._id;
        res.json(U.C.LOG_OUT);
    });
};


module.exports = credential_api;
