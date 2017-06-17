var winston = require('winston'); // A multi-transport async logging liberary
var morgan = require('morgan'); // HTTP request Logger Middelware
var path = require('path'); // path availabe in node js
var config = require('../config'); // get Config data use Convict in config
winston.emitErrs = true; // handle Error and Emit Error if Occuress

// create File When Server Get Http Request in logs and File Name Get From Config
var httpLogger = new winston.Logger({
	transports : [ new winston.transports.File({
			filename: config.get('logger.httpLogFileName'),
			json: true,
			maxsize: config.get('logger.logFileSize'),
			maxFiles: 5,
			colorsize: false 
	})],
	exitOnError : false
})

var logger = new winston.Logger({
	transports : [new winston.transports.File({
		filename : config.get('logger.logFileName'),
		json : true,
		maxsize : config.get('logger.logFileSize'),
		colorize : false,
	}),
	 new winston.transports.Console({
		level : 'debug',
		json : false,
		colorize : true
	})],
	 exceptionHandlers : [ new winston.transports.File({
		filename : config.get('logger.exceptionLogFileName'),
		json : true,
		maxsize : config.get('logger.logFileSize'),
		colorize : false,
	})],
	 exitOnError : false
})

// 
var stream = {
	write: function(message, encoding){
		console.log(config.get('logger.logFileName'));
		httpLogger.info(message)
	}
}

morgan.format('full', config.get('logger.httpLogFormat'))

logger.startHttpLogger = function() {
	return morgan('full', {
		stream : stream
	});
};

module.exports = logger;