var location_json = LocationJson.prototype;

function LocationJson(ID,NAME,DESCRIPTION,USERID,CREATETIME,LONGTITUDE,LATITUDE,PICURL){
    this._id = ID;
	this.name = NAME,
	this.description = DESCRIPTION,
	this.userid = USERID,
	this.createtime = CREATETIME,
    this.longtitude = LONGTITUDE,
    this.latitude = LATITUDE,
    this.picurl = PICURL
}

location_json.getID = function(){
	return this._id;
}
location_json.getName = function(){
	return this.name;
}
location_json.getDescription = function(){
	return this.description;
}
location_json.getUserid = function(){
	return this.userid;
}
location_json.getCreatetime = function(){
	return this.createtime;
}
location_json.getLongtitude = function(){
    return this.longtitude;
}
location_json.getLatitude = function(){
    return this.latitude;
}
location_json.getPicurl = function(){
    return this.picurl;
}

location_json.setID = function(){
	return this._id;
}
location_json.setName = function(){
	return this.name;
}
location_json.setDescription = function(){
	return this.description;
}
location_json.setUserid = function(){
	return this.userid;
}
location_json.setCreatetime = function(){
	return this.createtime;
}
location_json.setLongtitude = function(){
    return this.longtitude;
}
location_json.setLatitude = function(){
    return this.latitude;
}
location_json.setPicurl = function(){
    return this.picurl;
}

module.exports = LocationJson;