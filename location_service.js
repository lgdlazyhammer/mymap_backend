//import mongoose
var mongoose = require('mongoose');
//connect to db
var db = require('./mongodb_connection.js').db();
var LocationJson = require('./location_json.js');

var LocationSchema = new mongoose.Schema({
		name:String,
		description:String,
		userid:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
		createtime:Date,
        longtitude:String,
        latitude:String,
        picurl:String
		});
	
var LocationModel = db.model('Location',LocationSchema);
	
module.exports.save = function(LOCATION, CALLBACK){	
	var LocationEntity = new LocationModel({name:LOCATION.getName(),description:LOCATION.getDescription(),userid:LOCATION.getUserid(),createtime:LOCATION.getCreatetime(),longtitude:LOCATION.getLongtitude(),latitude:LOCATION.getLatitude(),picurl:LOCATION.getPicurl()});
	LocationEntity.save(function(err){ console.log(err); CALLBACK(err); });
}

module.exports.findByPageNum = function(START,USERID,CALLBACK){	
	LocationModel.find({userid:USERID}).sort({createtime:-1}).skip(START).limit(20).exec(function(err, DATA){ 
        
		if(err == null){
            console.log(DATA);
            var locationList = new Array();
            var temp = 0;
            for(var i=0;i<DATA.length;i++){

                (function(i){
                        var locationJson = new LocationJson();
                        locationJson._id = DATA[i]._id;
                        locationJson.name = DATA[i].name;
                        locationJson.description = DATA[i].description;
                        locationJson.createtime = DATA[i].createtime;
                        locationJson.longtitude = DATA[i].longtitude;
                        locationJson.latitude = DATA[i].latitude;
                        locationJson.picurl = DATA[i].picurl;
                        locationList.push(locationJson);
                })(i);
                
                if(i == DATA.length-1){
                    console.log(locationList);
                    CALLBACK(locationList);
                }

		      }
        }
	});
}

module.exports.findByID = function(ID, CALLBACK){	
	LocationModel.findById(ID,function(err, data){ 
		if(err == null){
			CALLBACK(data);
		};
	});
}

module.exports.updatePicurl = function(ID, PICURL, CALLBACK){	
	LocationModel.update({ _id: ID }, { $set: { picurl: PICURL }}, { multi: true }, function(err){ CALLBACK(err); });
}

module.exports.remove = function(ID){	
	LocationModel.remove({ _id: ID }, function (err) {
	  if (err) return handleError(err);
	  // removed!
	});
	return null;
}
