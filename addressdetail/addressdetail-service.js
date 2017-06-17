var serviceModel = require('./addressdetail-model');
var schemas = require('../models/schemas');
var saveDetail = function(req,res) {
	console.log(req.body);
	if(schemas.validate(req.body,schemas.userWithAddress)) {
		serviceModel.saveDetail(req.body).then(function(resp){
			res.status(500).send({
			'message':'succuess',
			'data':resp
		})
		}, function(err){})
	} else {
		res.status(500).send({
			'message':'missing Data',
			'data':{}
		})
	}
}
var getDetail = function(req,res){
	serviceModel.getDetail(req.body).then(function(resp){
		res.status(200).send({
			'message': 'succuess',
			'data': resp
		})
	}, function(err){})
}

module.exports = {
	saveDetail: saveDetail,
	getDetail: getDetail
}