var MongoClient = require('mongodb').MongoClient;
var q =require('q');
var config = require('../config');

var mongoClientDB = [];

var url = config.get('mongodb.host')+config.get('mongodb.database.db.name')

var connect = function(ConnectionString){
	var deffered = q.defer();
	if(ConnectionString != undefined){
		url = ConnectionString.host+ ConnectionString.database
	}
	if(ConnectionString != undefined && mongoClientDB[ConnectionString.database]) {
		deffered.resolve(mongoClientDB[ConnectionString.database])
	}
	else if(ConnectionString === undefined && mongoClientDB[config.get('mongodb.database.db.name')]) {
		deffered.resolve(mongoClientDB[config.get('mongodb.database.db.name')])
	} else {
		console.log(url);
		MongoClient.connect(url, function(err,db){
			if(err){
				defferd.reject(err)
			} else{
				        mongoClientDB[config.get('mongodb.database.db.name')] = db;
						deffered.resolve(mongoClientDB[config.get('mongodb.database.db.name')]);
			}
		})
	}
	return deffered.promise;
}

module.exports = {
	connect: connect
};