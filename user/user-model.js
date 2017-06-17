var db = require('../utils/mongo-db')
var config = require('../config')
var q = require('q')
var createUser = function(userDital) {
	console.log(userDital)
	var deffered = q.defer();
	db.addDocuments(config.get('mongodb.database.db.collection.user'), userDital).then(function(res){
		deffered.resolve(res);
	}, function(err){
		deffered.reject(err);
	})
	return deffered.promise;
}
var getUserList = function(userData){
	var deffered = q.defer();
	try{
		var filterdata = {}
		var fieldname = {
			"_id" : 1,
			"userName" : 1,
			"firstName" : 1,
			"lastName" : 1,
			"tech" : 1,
			"imagePath": 1
		};
		db.getDocument(config.get("mongodb.database.db.collection.user"), filterdata, fieldname).then(function(resp) {
			deffered.resolve(resp);
		}, function(err) {
			deffered.reject(err);
		});
	} catch(e){
		console.log(e)
	}
	return deffered.promise;
}
var deleteUser = function(userData){
	var deffered = q.defer();
	db.deleteDocument(config.get("mongodb.database.db.collection.user"), userData._id).then(function(resp) {
			deffered.resolve(resp);
		}, function(err) {
			deffered.reject(err);
		});
	return deffered.promise;
}
module.exports = {
	createUser: createUser,
	getUserList:getUserList,
	deleteUser: deleteUser
}