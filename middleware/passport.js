module.exports = function (app) {
	var passport = require('passport');
	var localStrategy = require('passport-local').Strategy;
	var user = require('../models/user');

	app.use(passport.initialize());
	app.use(passport.session());

	var strategy = new localStrategy({
		usernameField : 'userName',
		passwordField : 'password'
	}, function(userName, password, next){
		user.authenticate(userName, password).then(function(auser){
			next(null,auser)
		}, function(err){
			next(null, false)
		})
	})

	passport.use(strategy);

	passport.serializeUser(function(userName,next){
		next(null, userName)
	})
	passport.deserializeUser(function(userName,next){
		user.findOne(userName).then(function(auser){
			next(null, auser);
		}, function(error){
			next(null, false);
		})
	})

}