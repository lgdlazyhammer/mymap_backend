var user = User.prototype;

function User(EMAIL, NAME, PASSWORD, GENDER, PICTURE){
	this.email = EMAIL;
	this.name = NAME;
	this.password = PASSWORD;
	this.gender = GENDER;
	this.picture = PICTURE;
}

user.getEmail = function(){
	return this.email;
}

user.getName = function(){
	return this.name;
}

user.getPassword = function(){
	return this.password;
}

user.getGender = function(){
	return this.gender;
}

user.getPicture = function(){
	return this.picture;
}

user.setEmail = function(EMAIL){
	this.email = EMAIL;
}

user.setName = function(NAME){
	this.name = NAME;
}

user.setPassword = function(PASSWORD){
	this.password = PASSWORD;
}

user.setGender = function(GENDER){
	this.gender = GENDER;
}

user.setPicture = function(PICTURE){
	this.picture = PICTURE;
}

module.exports = User;