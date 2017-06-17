var passport  = require('passport');
var user = require('../models/user');

module.exports = {}

var session = function(req, res){
	if(req.isAuthenticated()){
		return res.status(200).send({
			code:2000,
			data: req.user
		})
	} else{
		return res.status(200).send({
			code : 2002,
			data : {}
		});
	}
}
var login =  function(req,res){
	passport.authenticate('local', function(error, auser){
		console.log('error'+auser)
		if(error){
			return res.status(400).send({
				code:400,
				data:{}
			})
		}
		if(auser == undefined){
			return res.status(400).send({
				code:400,
				data:{}
			})	

		}else{
			var ip = req.header['x-forwarded-for'] || req.connection.remoteAddress;
			user.login(auser.userName, auser.password, req.sessionID,ip).then(function(result){
				req.login(auser.userName, function(error){
					return res.status(200).send({
						code : 2003,
						data : auser
					});
				})
			})
		}	
	}, function(err){
			return res.status(400).send({
				code : 2004,
				data : {}
			})
		})(req, res)
}

module.exports = {
	session:session,
	login:login
}