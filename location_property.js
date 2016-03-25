var location = Location.prototype;

function Location(NAME,DESCRIPTION,USERID,CREATETIME,LONGTITUDE,LATITUDE,PICURL){
	this.name = NAME,
	this.description = DESCRIPTION,
	this.userid = USERID,
	this.createtime = CREATETIME,
    this.longtitude = LONGTITUDE,
    this.latitude = LATITUDE,
    this.picurl = PICURL
}

location.getName = function(){
	return this.name;
}
location.getDescription = function(){
	return this.description;
}
location.getUserid = function(){
	return this.userid;
}
location.getCreatetime = function(){
	return this.createtime;
}
location.getLongtitude = function(){
    return this.longtitude;
}
location.getLatitude = function(){
    return this.latitude;
}
location.getPicurl = function(){
    return this.picurl;
}


location.setName = function(){
	return this.name;
}
location.setDescription = function(){
	return this.description;
}
location.setUserid = function(){
	return this.userid;
}
location.setCreatetime = function(){
	return this.createtime;
}
location.setLongtitude = function(){
    return this.longtitude;
}
location.setLatitude = function(){
    return this.latitude;
}
location.setPicurl = function(){
    return this.picurl;
}

module.exports = Location;