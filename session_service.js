//import mongoose
var mongoose = require('mongoose');
//connect to db
var db = require('./mongodb_connection.js').db();

var SessionSchema = new mongoose.Schema({ _id:String, session:String, expires:String });
	
var SessionModel = db.model('Session',SessionSchema);

module.exports.getSession = function(ID, CALLBACK){	

	console.log('get session data!-----'+ID);
	SessionModel.find({ _id:ID}, function(err, data){ console.log('get session data failed!'+err);CALLBACK(data);});
}
