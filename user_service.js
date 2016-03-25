//import mongoose
var mongoose = require('mongoose');
//connect to db
var db = require('./mongodb_connection.js').db();

var UserSchema = new mongoose.Schema({
		email:String,
		name:String,
		password:String,
		gender:String,
		picture:String
		});
		
//为Schema模型追加speak方法
UserSchema.methods.speak = function(){
    console.log('我的名字叫'+this.name);
}
	
var UserModel = db.model('User',UserSchema);
	
module.exports.save = function(USER, CALLBACK){	
	var userEntity = new UserModel({email:USER.getEmail(),name:USER.getName(),password:USER.getPassword(),gender:USER.getGender(),picture:USER.getPicture()});
	userEntity.save(function(err){ console.log(err); CALLBACK(err); });
}

module.exports.checkLogin = function(NAME, PASSWORD, CALLBACK){	

	UserModel.find({ name:NAME, password:PASSWORD }, function(err, data){ CALLBACK(data);});
}

module.exports.checkUserExist = function(NAME, CALLBACK){	

	UserModel.find({ name:NAME }, function(err, data){ CALLBACK(data);});
}

module.exports.findUser = function(ID, CALLBACK){	

	UserModel.find({ _id:ID }, function(err, data){ CALLBACK(data);});
}

module.exports.remove = function(ID){	
	UserModel.remove({ _id: ID }, function (err) {
	  if (err) return handleError(err);
	  // removed!
	});
}

module.exports.updatePassword = function(ID, PASSWORD){	
	UserModel.update({ _id: ID }, { $set: { password: PASSWORD }}, { multi: true }, function(){});
}

module.exports.updatePicture = function(ID, PICTURE, CALLBACK){	
	UserModel.update({ _id: ID }, { $set: { picture: PICTURE }}, { multi: true }, function(err){ CALLBACK(err); });
}
