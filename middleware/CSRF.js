var csrf = require('csurf');
var logger = require('../utils/logger');
var user = require('../models/user');

	
module.exports = function(app){
	app.use(function(req,res,next){

		if(req.method.toLowerCase()==='post' && req.header('x-xsrf-token') === undefined){
			logger.warn('request without token')
			res.status(403).send({
				code:4006,
				data: {}
			})
		} else {
			next();
		}
	})
	app.use(csrf());
	app.use(function (req, res, next) {
		logger.info('Request: URL:%s - SessionID:%s', req.url, req.sessionID);
		var token = req.csrfToken();
		// for web and mobile application
		res.header('XSRF-TOKEN', token);

		if (req.method.toLowerCase() === 'get' && req.url != '/download/Image') {
			console.log(req.header.toString());
			if (req.isAuthenticated() && (req.header('x-xsrf-token') == undefined)) {
				// Something went wrong
				user.logout(req.user.userName).then(function (status) {
					req.logout();
					for (var cookie in req.cookies) {
						res.clearCookie(cookie);
					}
					req.session.destroy();
					res.status(200).end();
				}, function (error) {
					res.status(500).send({
						code: 5000,
						data: {}
					});
				});
			} else {
				next();
			}
		} else {
			next();
		}
	});
	app.use(function (error, req, res, next) {
		if (error.code !== 'EBADCSRFTOKEN') {
			return next(error);
		}
		logger.warn('possible CSRF attack detected');
		res.status(403).send({
			code: 4005,
			data: {}
		});
	});
}