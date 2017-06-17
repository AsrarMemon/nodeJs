var service = require('./user-service')
var multer = require('multer');
var fs = require('fs');
module.exports = function(app){
	var upload = multer({dest:__dirname+'/../uploadFiles'})
	app.post('/user/createuser',upload.single('fileUp'), service.createUser)
	  // app.use('/user/createuser',service.createUser)
	  app.get('/download/Image',function(req,res){
	  	console.log(req.query);
	  	try{
	  	var file = fs.readFileSync(__dirname+'/../uploadFiles/'+req.query.id);
	  	res.writeHeader(200,{'Content-Type':'image/png'})
	  	res.end(file,'binary');	
	  	}
	  	catch(e){
	  		
	  	}
	  	
	  	// fs.readFile(__dirname+'/../uploadFiles/030aad3c34c0514d852b27e229785103', function(err,data){

	  	// 	if(err){
	  	// 		res.status(400).send({
	  	// 			code: 400,
	  	// 			massage: 'file not found'
	  	// 		})
	  	// 	}else{
	  	// 		res.status(200).send(
	  	// 	 data)
	  	// 	}
	  	// })
	  	// res.sendfile(__dirname
	  })
	app.use('/user/getList', service.getUserList)
	app.use('/user/deleteUser', service.deleteUser)
}
