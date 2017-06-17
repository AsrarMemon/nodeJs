var Validator = require('jsonschema').Validator
var _validator = new Validator();
var schemas = function(){

}

schemas.createUser = {
	'id': 'createUser',
	'type': ['object', 'null'],
	'properties': {
		'userName': {
			'type': 'string',
			'required': true
		},
		'password': {
			'type': 'string',
			'required': true
		},
		'firstName': {
			'type': 'string',
			'required': true
		},
		'lastName': {
			'type': 'string',
			'required': true
		},
		'tech': {
			'type': 'string',
			'required': false
		},
		'imagePath': {
			'type': 'string',
			'required': true
		}
	}
}
schemas.deleteUser = {
	'id': 'deleteUser',
	'type': ['object', 'null'],
	'properties':{
		'_id':{
			'type': 'string',
			'required': true
		}
	}
}
schemas.userWithAddress = {
	'id': 'userWithAddress',
	'type':['object','null'],
	'properties':{
		'userid':{
			'type': 'string',
			'required': false
		},
		'name': {
			'type': 'string',
			'required': true	
		},
		'address': {
			'type': 'array',
			'items':{
				'$ref':'/userAddress'
			},
			'required': true
		}
	}
}
schemas.userAddress = {
	'id': '/userAddress',
	'type':'object',
	'properties': {
		'street':{
			'type': 'string',
			'required': true
		},
		'city':{
			'type': 'string',
			'required': true
		},
		'zipCode':{
			'type': 'string',
			'required': true
		}
	}
}
_validator.addSchema(schemas.userAddress, '/userAddress');
schemas.validate = function(obj, schema){
	var errors = _validator.validate(obj,schema).errors;
	return errors.length <= 0 ? true : false;
}
module.exports = schemas;
