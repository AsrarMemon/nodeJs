var bodyParser = require('body-parser');
var logger = require('../utils/logger');
var compression = require('compression');
var helmet = require('helmet');
var config = require('../config')
module.exports = function(app) {
	// log for HTTP Requrest
	if(config.get('server.enableHttpLogging')){
		app.use(logger.startHttpLogger());
	}
	// comression
	if(config.get('server.enableCompression')) {
		app.use(compression())
	}	
	if (config.get('server.security.enableXframe'))
		app.use(helmet.frameguard())
	// Remove X-Powered-By
	if (config.get('server.security.enableHidePoweredBy'))
		app.use(helmet.hidePoweredBy());
	// use for not store cache at client 
	if(config.get('server.security.enableNoCaching'))
		app.use(helmet.cacheControl())
	// allow loading resource only from white-listend domin
	if(config.get('server.security.enableCSP'))
		app.use(helmet.csp())
	// Allowing communication only on Https
	if(config.get('server.security.enableHSTS'))
		app.use(helmet.hsts())
	// XSS Filter
	if(config.get('server.security.enableXssFilter'))
		app.use(helmet.xssFilter())
	// Forces browser to only use the Content-Type set in the response header instead of sniffing or guessing it
	if (config.get('server.security.enableForceContentType'))
		app.use(helmet.contentTypeOptions());
	if(config.get('server.security.enableCORS'))
		require('./CORS')(app)
	// Enable Body Parser
		app.use(bodyParser.json({
			limit : config.get('server.bodyParser.limit')
		}))

		require('./session-mongo')(app);
	
	require('./passport')(app);
	
	// Enable CSRF token security
	require('./CSRF')(app);
}