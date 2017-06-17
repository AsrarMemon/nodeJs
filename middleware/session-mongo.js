var session = require('express-session');
var MongoDBStore = require('connect-mongo')(session);
var config = require('../config');

module.exports = function(app){
	var store = new MongoDBStore({
		url: config.get('mongodb.host') + config.get('mongodb.database.session'),
		ttl : config.get('server.session.maxAge')
	})
	app.use(new session({
		path : config.get('server.session.path'),
		secret : config.get('server.session.secret'),
		httpOnly : config.get('server.session.httpOnly'),
		proxy : config.get('server.session.proxy'),
		rolling : config.get('server.session.rolling'),
		store : store,
		resave : true,
		saveUninitialized : config.get('server.session.saveUninitialized')
	}))
}