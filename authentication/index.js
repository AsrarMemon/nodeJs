var service = require('./authentication-service')
module.exports = function(app){
	app.get('/auth/session', service.session)
	app.post('/auth/login', service.login)
}