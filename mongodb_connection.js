//connect to mongodb
var mongoose = require('mongoose');
//create connection
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/mymap');
	//connection error
	db.on('error', function(error) {
		console.log(error);
	});
	
module.exports.db = function(){
	return db;
}

/*var UserSchema = new mongoose.Schema({
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

var userEntity = new UserModel({name:user.getName(),password:user.getPassword(),gender:user.getGender(),picture:user.getPicture()});
//打印这个实体的名字看看
console.log(userEntity.name); //Krouky
userEntity.save();  //执行完成后，数据库就有该数据了
	
UserModel.find(function(err,persons){
    //查询到的所有person
	console.log(persons);
});
	
UserModel.find({ name: 'lora' }, function(err, data){ console.log(data); });

var PersonSchema = new mongoose.Schema({
		  name:String   //定义一个属性name，类型为String
		});
		
var PersonModel = db.model('Person',PersonSchema);

PersonModel.find({ name: 'Krouky' }, function(err, data){ console.log(data);});

	var PersonSchema = new mongoose.Schema({
		  name:String   //定义一个属性name，类型为String
		});
		
	//为Schema模型追加speak方法
    PersonSchema.methos.speak = function(){
      console.log('我的名字叫'+this.name);
    }
	
	var PersonModel = db.model('Person',PersonSchema);
	
	 var personEntity = new PersonModel({name:'Krouky'});
    //打印这个实体的名字看看
    console.log(personEntity.name); //Krouky
	
	personEntity.save();  //执行完成后，数据库就有该数据了
	
	PersonModel.find(function(err,persons){
      //查询到的所有person
    });
	
	PersonModel.find({ name: /^Fluff/ }, callback);*/