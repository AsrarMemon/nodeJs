var http = require('http');
var express = require('express');
var config = require('./config');
var middleware = require('./middleware/index');
var router = require('./routes/index.js')
var app = express();

app.set('port', config.get('server.port'))
try{
	console.log(config.get('server.session'))
// setup middleware
middleware(app);
router(app);
}
catch(e){
	console.log(e)
}


var server = http.createServer(app).listen(app.get('port'), function(){
	console.log(app.get('port'));
})