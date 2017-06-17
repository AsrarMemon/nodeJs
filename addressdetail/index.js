var addressService = require('./addressdetail-service');

module.exports = function(app){
	app.use('/person/saveDetail',addressService.saveDetail)
	app.use('/person/getDetail', addressService.getDetail)
}