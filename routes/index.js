module.exports = function(app){
		require('../authentication/index')(app)
		require('../user/index')(app)
		require('../addressdetail/index')(app)
}