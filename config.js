// test
var convict = require('convict');

var config = new convict({
	env: {
		doc: 'The applicaton environment.',
		format: ['dev'],
		default: 'dev',
		env: 'NODE_ENV',
		arg: 'env'
	},
	server : {
		port : {
			doc: 'HTTP port to bind',
			format: 'port',
			default: 3010,
			env: 'PORT'
		},
		enableHttpLogging: {
			doc: 'Enable HTTP Logging',
			format: Boolean,
			default: true
		},
		enableRequestLoggin: {
			doc: 'Enable Request Logging',
			format: Boolean,
			default: true
		},
		enableCompression : {
			doc: 'Compression',
			format: Boolean,
			default: true
		},
		enableStatic : {
			doc: 'static',
			format: Boolean,
			default: true
		},
		security: {
			enableXframe: {
				doc: 'Enable Iframe protection',
				format: Boolean,
				default: true
			},
			enableHidePoweredBy: {
				doc: 'Hide X powered by Header',
				format: Boolean,
				default: true
			},
			enableNoCaching: {
				doc: 'Enable No caching',
				format: Boolean,
				default: false
			},
			enableCSP: {
				doc: 'Enable CSP policy',
				format: Boolean,
				default: false
			},
			enableHSTS: {
				doc: 'Enable HSTS',
				format: Boolean,
				default: false
			},
			enableXssFilter: {
				doc: 'Enable XSS filter protection',
				format: Boolean,
				default: true
			},
			enableForceContentType: {
				doc: 'Enable force content type',
				format: Boolean,
				default: false
			},
			enableCORS: {
				doc: 'Enable CORS',
				format: Boolean,
				default: true
			}
		},
		CORS: {
			allowedHosts: {
				doc: 'Allowed Host for CORS',
				format: Array,
				default: ['http://localhost:3000']
			},
			allowedMethods: {
				doc: 'Allowed HTTP Methods for CORS',
				format: String,
				default: 'GET,POST,OPTIONS'
			},
			allowedHeaders: {
				doc: 'Allowed HTTP Headers for CORS',
				format: String,
				default: 'accept, x-xsrf-token,Content-type'
			},
			exposedHeaders: {
				doc: 'Exposed HTTP Headers for CORS',
				format: String,
				default: 'XSRF-TOKEN'
			}
		},
		session: {
			sidname: {
				doc: 'Name of a session',
				format: String,
				default: 'connect.sid'
			},
			path: {
				doc: 'Path of a session',
				format: String,
				default: '/'
			},
			httpOnly: {
				doc: 'httpOnly cookie',
				format: Boolean,
				default: true
			},
			secure: { // should be set to true when using https
				doc: 'Http security of a session',
				format: Boolean,
				default: false
			},
			maxAge: {
				doc: 'Maximum age of a session',
				format: Number,
				default: 24 * 60 * 60 * 1000 // one day
			},
			proxy: { // should set to true when using https and reverse proxy
				// like HAproxy
				doc: 'Http proxy',
				format: Boolean,
				default: false
			},
			rolling: { // should set to true when want to have sliding window
				// session
				doc: 'For sliding window of a session',
				format: Boolean,
				default: false
			},
			saveUninitialized : {
				doc: 'For sliding window of a session',
				format: Boolean,
				default: true
			}
		},
		bodyParser: {
			limit: {
				doc: 'maximum request body size',
				format: String,
				default: '100kb'
			}
		}
	},
	logger: {
		httpLogFormat: {
			doc: 'HTTP log format',
			format: String,
			default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
		},
		httpLogFileName: {
			doc: 'HTTP log File name',
			format: String,
			default: 'http.log'
		},
		logFileName: {
			doc: 'Log File name',
			format: String,
			default: 'logs.log'
		},
		exceptionLogFileName: {
			doc: 'Exception log File name',
			format: String,
			default: 'exceptions.log'
		},
		logFileSize: {
			doc: 'logs File Max File size',
			format: Number,
			default: 5242880
		},
		path: {
			doc: 'path for log fils',
			format: String,
			default: __dirname
		}
	},
	mongodb: {
		host: {
			doc: 'MongoDB Hostname',
			format: String,
			default: 'mongodb://localhost:27017/',
		},
		database: {
			db: {
				name: {
					doc: 'Database Name',
					format: String,
					default: 'firstnode',
				},
				collection: {
					user: {
						doc: 'User Collection Name',
						format: String,
						default: 'user',
					}
				}
			},
			session: {
				doc: 'Session Database Name',
				format: String,
				default: 'firstnode_Session',
			}
		},
		defaultDatabase: {
			doc: 'Database Name',
			format: String,
			default: 'firstnode',
		}
	}
})

config.loadFile('./config-' + config.get('env') + '.json');
config.set('logger.httpLogFileName', config.get('logger.path')+'/logs/' + config.get('logger.httpLogFileName'));
config.set('logger.logFileName', config.get('logger.path')+'/logs/' + config.get('logger.logFileName'));
config.set('logger.exceptionLogFileName', config.get('logger.path')+'/logs/'+ config.get('logger.exceptionLogFileName'));

// validate
config.validate();
module.exports = config;