var q = require('q')
var mongoClient = require('./mongo-db-connection')
var mongodb = require('mongodb');
var getDocument = function(tableName, docToSearch, fieldName) {
	 var deffered =  q.defer()
	 if(fieldName == undefined){
	 	fieldName={}
	 }
	mongoClient.connect().then(function(connect){
		connect.collection(tableName).find(docToSearch, fieldName).toArray(function(err,resp){
			if (!err) {
					deffered.resolve(resp);
				} else {
					console.log(err)
					deffered.reject(err);
				}
		})
	})	
	return deffered.promise; 
}
var addDocuments = function(tableName,userdata){
	var deffered = q.defer()
	console.log(userdata);
	mongoClient.connect().then(function(connect){
		connect.collection(tableName).save(userdata).then(function(res){
			deffered.resolve(res)
		}, function(error){
			console.log(error);
			deffered.reject(error);
		})
	})
	return deffered.promise;
}
var modifyDocument = function(tableName, uniqueReference, docstoUpdate) {
	var deffered = q.defer();
	mongoClient.connect().then(function(connection) {
		try {
			connection.collection(tableName).update(uniqueReference, docstoUpdate).then(function(resp) {
				deffered.resolve(resp);
			}, function(err) {
				deffered.reject(err);
			});
		} catch (ex) {
			console.log(ex.stack);
		}
	}, function(error) {
		deffered.reject(error);
	});
	return deffered.promise;
}

var modifyProperty = function(tableName, uniqueReferace, propertyTobeSet){
	
	try{
	var deffered = q.defer()

	mongoClient.connect().then(function(connect){
		connect.collection(tableName).update(uniqueReferace, {
			$set:propertyTobeSet
		}).then(function(resp){
		deffered.resolve(resp);	
		}, function(err){
			console.log(err);
			deffered.reject(err);	
		})
	})
}
catch(e){
	console.log(e);
}
return deffered.promise;	
}
var deleteDocument = function(tableName, uniqueReferace){
	try{
	var deffered = q.defer()

	mongoClient.connect().then(function(connect){
		connect.collection(tableName).remove({_id: new mongodb.ObjectID(uniqueReferace)}).then(function(resp){
		deffered.resolve(resp);	
		}, function(err){
			console.log(err);
			deffered.reject(err);	
		})
	})
}
catch(e){
	console.log(e);
}
return deffered.promise;	
}
module.exports={
	getDocument:getDocument,
	addDocuments:addDocuments,
	deleteDocument: deleteDocument,
	modifyProperty: modifyProperty,
	modifyDocument: modifyDocument
}