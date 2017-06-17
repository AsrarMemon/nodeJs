var user = require('./user-model')
var schemas =  require('../models/schemas');
var fs = require('fs');	
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var createUser = function(req,res){
	try{
		var userdetail = {};

		userdetail = JSON.parse(req.body.personData);
		console.log(req.file);
		userdetail.imagePath = req.file.filename;
		if(schemas.validate(userdetail, schemas.createUser)){
			user.createUser(userdetail).then(function(resp){
				console.log('ooooo')
				return res.status(200).send({
					code:200,
					data:resp
				});
			}, function(error){

			})
		} else{
			return res.status(400).send({
				code:4000000,
				data:{}
			})
		}
	} catch(e){
		console.log(e)
	}
}
var getUserList = function(req, res){
	try{
		var data ={}
		user.getUserList(data).then(function(resp){
			if(resp.length>0){
				return res.status(200).send({
					code: 200,
					data: resp
				})
			} else{
				return res.status(400).send({
					code: 400,
					data: {}	
				})
			}
		}, function(err){
			return res.status(400).send({
					code: 400,
					data: {}	
				})
		})
	} catch(e){
		console.log(e)
	}
}
var deleteUser = function(req,res){
try{
	if(true){
		if(schemas.validate(req.body, schemas.deleteUser)){
			user.deleteUser(req.body).then(function(resp){

				res.status('200').send({
					massge: 'user is deleted',
					data: resp
				})	
			},function(err){
				res.status('500').send({
					massge: 'Error in delete',
					data: {}
				})
			})
		} else{
			res.status('500').send({
			massge: 'user is not Authenticated',
			data: {}
			})	
		}
	}else{
		res.status('500').send({
			massge: 'user is not Authenticated',
			data: {}
		})
	}
}catch(e){
	console.log(e)
}
}
module.exports = {
	createUser: createUser,
	getUserList:getUserList,
	deleteUser: deleteUser
}