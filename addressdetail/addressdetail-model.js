var q = require('q');
var db = require('../utils/mongo-db');
var saveDetail = function(userData){
	var deffered = q.defer();
	var userModify = {}
	var Address = {};
	Address.address = userData.address;
	db.addDocuments('Address', Address).then(function(res){
		userModify.name = userData.name;
		userModify.address = res.ops[0]._id;
		db.addDocuments('person', userModify).then(function(resp){
			deffered.resolve(resp)	
		}, function(err){
			deffered.reject(err)	
		})
		
	}, function(err){
		deffered.reject(err)
	})
	return deffered.promise;
}
var getDetail = function(searchData){
	var deffered = q.defer();
	db.getDocument('person', {}).then(function(resp){
		deffered.resolve(resp)
	}, function(err){
		deffered.reject(err)
	});
	return deffered.promise;
}

module.exports = {
	saveDetail: saveDetail,
	getDetail: getDetail
}