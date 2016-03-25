var fs = require('fs');
var bodyParser = require('body-parser');
var formidable = require("formidable");
var util = require('util');
var url = require('url');
var qs = require('querystring');
var userService = require('./user_service.js');
var locationService = require('./location_service.js');
var User = require('./user_property.js');
var Location = require('./location_property.js');
var sessionService = require('./session_service.js');

module.exports = function(app){
	
	app.get('/',function(req,res){
		
		app.render('index.html',function(err, renderedData){
		})
	});
	
	app.use('/loginapi',function(req,res){
		
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;

				// Too much POST data, kill the connection!
				if (body.length > 1e6)
					req.connection.destroy();
			});
			req.on('end', function () {
				var post = qs.parse(body);

				// use post['blah'], etc.
				console.log('this is the post dealing process!');
				console.log("params-----"+body);
				console.log("params-----name-----"+JSON.parse(body).name);
				console.log('headers------'+req.headers);
				console.log('headers------'+req.get('Authorization'));
				console.log('request header authorization------'+req.headers['Authorization']);
				if(req.get('Authorization') == null || req.get('Authorization') == ''){
				}
				
				userService.checkLogin(JSON.parse(body).name,JSON.parse(body).password,function(user){ 
					console.log('user-------'+user[0]);
					if((user[0] == '') || (user[0] == null)){
						res.writeHead(200, { 
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Credentials': true,
							'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
							'Access-Control-Allow-Headers': 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
							'Access-Control-Max-Age': 1728000
						}); 
						// 数据以json形式返回
						var temp = { result:'noexist'};
						res.end(JSON.stringify(temp)); 
						return;
						}else{
                            //save current user to session                                                                                                    
                            req.session.user = user[0]; 
                            req.session.save();
                            console.log('session user---'+req.session.user);
                            console.log('request session id---'+req.sessionID);
                            //req.cookies['local:sessid'] = req.sessionID;
                            require('./ciphers_crypt_decrypt.js').encrypt(req.sessionID,function(encrypted){

                                res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Credentials': true,
                                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                                'Access-Control-Allow-Headers': 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
                                'Access-Control-Max-Age': 1728000
                                });
                                // 数据以json形式返回
                                var temp = { result:'success', sessionId:encrypted};
                                res.end(JSON.stringify(temp)); 
                                return;
                            });			
					}
				});
					
			});
		}else{
		}
		
	});
	
	app.post('/registerapi',function(req,res){
		
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;

				// Too much POST data, kill the connection!
				if (body.length > 1e6)
					req.connection.destroy();
			});
			req.on('end', function () {
				var post = qs.parse(body);

				// use post['blah'], etc.
				console.log("params-----"+body);
				console.log("params-----name-----"+JSON.parse(body).name);
				
				var user = new User(JSON.parse(body).email,JSON.parse(body).name,JSON.parse(body).password,JSON.parse(body).gender,JSON.parse(body).picture);
				userService.save(user,function(err){ 
					console.log('err-------'+err);
					if(!((err == '') || (err == null))){
						res.writeHead(200, { 
						'Content-Type': 'x-application/json' 
						}); 
						// 数据以json形式返回
						var temp = { result:'savefailed'};
						res.end(JSON.stringify(temp)); 
						return;
					}else{
						res.writeHead(200, { 
						'Content-Type': 'x-application/json' 
						}); 
						// 数据以json形式返回
						var temp = { result:'success'};
						res.end(JSON.stringify(temp)); 
						return;
					}
				});
					
			});
		}else{
			res.writeHead(200, { 
			'Content-Type': 'x-application/json' 
			}); 
			// 数据以json形式返回
			var temp = { result:'fail'};
			res.end(JSON.stringify(temp));  
		}
		
	});
	
	app.post('/addlocationapi',function(req,res){
		
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;

				// Too much POST data, kill the connection!
				if (body.length > 1e6)
					req.connection.destroy();
			});
			req.on('end', function () {
				var post = qs.parse(body);
				console.log('here  comes the add location api.');
				if(!(req.get('Authorization') == null || req.get('Authorization') == '' || req.get('Authorization') == 'off')){
					
					require('./ciphers_crypt_decrypt.js').decrypt(req.get('Authorization'),function(sessionID){
					
						sessionService.getSession(sessionID,function(data){
							console.log('authorization session----'+data);
							console.log('authorization session session----'+data[0].session);
							console.log('authorization session session user id----'+JSON.parse(data[0].session).user._id);
							
								var location = new Location(JSON.parse(body).name,JSON.parse(body).description,JSON.parse(data[0].session).user._id,new Date().toJSON(),JSON.parse(body).longtitude,JSON.parse(body).latitude,'');
								locationService.save(location,function(err){
									if(err == null){	
										res.writeHead(200, { 
										'Content-Type': 'x-application/json' 
										}); 
										// 数据以json形式返回
										var temp = { result:'success'};
										res.end(JSON.stringify(temp)); 
										return;
									}else{
										res.writeHead(200, { 
										'Content-Type': 'x-application/json' 
										}); 
										// 数据以json形式返回
										var temp = { result:err};
										res.end(JSON.stringify(temp)); 
										return;
									}
								});
						});
					});
					
				}else{
					res.writeHead(200, { 
						'Content-Type': 'x-application/json' 
						}); 
					// 数据以json形式返回
					var temp = { result:'nologin'};
					res.end(JSON.stringify(temp)); 
					return;
				}
			});
		}else{
			res.writeHead(200, { 
			'Content-Type': 'x-application/json' 
			}); 
			// 数据以json形式返回
			var temp = { result:'fail'};
			res.end(JSON.stringify(temp));  
			return;
		}
		
	});
	
	app.post('/getlocationlistapi',function(req,res){
		
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;

				// Too much POST data, kill the connection!
				if (body.length > 1e6)
					req.connection.destroy();
			});
			req.on('end', function () {
				var post = qs.parse(body);

				// use post['blah'], etc.
				console.log("params-----"+body);
				console.log("params-----start-----"+JSON.parse(body).start);
                if(!(req.get('Authorization') == null || req.get('Authorization') == '' || req.get('Authorization') == 'off')){
					
					require('./ciphers_crypt_decrypt.js').decrypt(req.get('Authorization'),function(sessionID){
					
						sessionService.getSession(sessionID,function(data){
							console.log('authorization session----'+data);
							console.log('authorization session session----'+data[0].session);
							console.log('authorization session session user id----'+JSON.parse(data[0].session).user._id);
				            locationService.findByPageNum(JSON.parse(body).start,JSON.parse(data[0].session).user._id,function(data){
                                res.writeHead(200, { 
                                    'Content-Type': 'x-application/json' 
                                    }); 
                                // 数据以json形式返回
                                var temp = { result:data };
                                res.end(JSON.stringify(temp)); 
                                return;
                            });
						});
					});
					
				}else{
					res.writeHead(200, { 
						'Content-Type': 'x-application/json' 
						}); 
					// 数据以json形式返回
					var temp = { result:'nologin'};
					res.end(JSON.stringify(temp)); 
					return;
				}
				/*themeService.findAll(JSON.parse(body).start,function(data){
					
					console.log("return array-----"+data +"-data length--"+data.length);
					
					userService.findUserThemes(data,function(datatheme){
						console.log('josn data theme ---'+JSON.stringify(datatheme));

						res.writeHead(200, { 'Content-Type': 'x-application/json' }); 
						// 数据以json形式返回
						res.end(JSON.stringify(datatheme)); 
						return;
					});	
					
				});*/
	
			});
		}else{
			res.writeHead(200, { 
			'Content-Type': 'x-application/json' 
			}); 
			// 数据以json形式返回
			var temp = { result:'fail'};
			res.end(JSON.stringify(temp));  
		}
		
	});
	
	app.post('/getlocationlistsizeapi',function(req,res){
		
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;

				// Too much POST data, kill the connection!
				if (body.length > 1e6)
					req.connection.destroy();
			});
			req.on('end', function () {
				var post = qs.parse(body);
				
				/*themeService.countAll(function(data){
					
					console.log("return array-----"+data);
					// 数据以json形式返回
					var temp = { result: data };
					res.end(JSON.stringify(temp));
					return;	
					
				});*/
	
			});
		}else{
			res.writeHead(200, { 
			'Content-Type': 'x-application/json' 
			}); 
			// 数据以json形式返回
			var temp = { result:'fail'};
			res.end(JSON.stringify(temp));  
		}
		
	});
	
	app.post('/uploadpersonpictureapi',function(req,res){
		
		console.log("here comes to the upload  picture url!");
		
		if(!(req.get('Authorization') == null || req.get('Authorization') == '' || req.get('Authorization') == 'off')){
			
			console.log("upload person authorization branch.");
			require('./ciphers_crypt_decrypt.js').decrypt(req.get('Authorization'),function(sessionID){
					
				sessionService.getSession(sessionID,function(data){
					console.log('session----'+data);
					console.log('session session----'+data[0].session);
					//console.log('session session user id----'+JSON.parse(data[0].session).user._id);
					var userId = JSON.parse(data[0].session).user._id;
					 if(!fs.existsSync(__dirname + "/uploads/"+userId)){
						 fs.mkdirSync(__dirname + "/uploads/"+userId, 0766, function(err){
						   if(err){ 
							 console.log(err);
							 response.send("ERROR! Can't make the directory! \n");    // echo the result back
						   }
						 });   
					 }
					 
					//make new save location
					var newPath = __dirname + "\\uploads\\"+userId+"\\"; 
					 // parse a file upload
					var form = new formidable.IncomingForm();
					form.parse(req, function(err, fields, files) {
						//save the file
						fs.readFile(files.file.path, function (err, data) {
					
							console.log('file location----'+files.file.path);
							var file_ext = files.file.name;
							var count = file_ext.lastIndexOf('.');
							file_ext = file_ext.substring(count,file_ext.length);
							console.log('file extension----'+file_ext);
							//get the date and remove the :
							var date_today = new Date().toJSON();
							date_today = date_today.replace(":","-");
							date_today = date_today.replace(":","-");
							//make new save location
							newPath = newPath+date_today+file_ext;
							console.log('the new file path for the user------'+newPath);
							fs.writeFile(newPath, data, function (err) {
								if(err != null){
									res.writeHead(200, { 
									'Content-Type': 'x-application/json' 
									}); 
									// 数据以json形式返回
									var temp = { result:'fail', error:err };
									res.end(JSON.stringify(temp));  
									return;
								}else{
									userService.findUser(userId,function(data){
										console.log('delete user picture------'+ __dirname + data[0].picture);
										fs.unlink(__dirname + data[0].picture, function(err){
											//if delete fail the server will response a status 500
											if(err != null){
												res.writeHead(200, { 
												'Content-Type': 'x-application/json' 
												}); 
												// 数据以json形式返回
												var temp = { result:'fail', error:err};
												res.end(JSON.stringify(temp));
												return;
											}
										});
									});
									userService.updatePicture(userId, "\\uploads\\"+userId+"\\"+date_today+file_ext,function(err){
										if(err == null){
											res.writeHead(200, { 
											'Content-Type': 'x-application/json' 
											}); 
											// 数据以json形式返回
											var temp = { result:'success', error:err};
											res.end(JSON.stringify(temp));
											return;
										}else{
											res.writeHead(200, { 
											'Content-Type': 'x-application/json' 
											}); 
											// 数据以json形式返回
											var temp = { result:'fail', error:err };
											res.end(JSON.stringify(temp));
											return;
										}
									});
								}
								
							});
						});
					  
					});
				});
			});
			
		}else{
			console.log('user upload picture no login.');
			res.writeHead(200, {'content-type': 'text/plain'});
			res.write('no login');
			res.end('');
		}
	
	});

	app.post('/uploadpicture',function(req,res){
		
		console.log("here comes to the uploadurl!");
		
		 if(!fs.existsSync(__dirname + "/uploads")){
			 fs.mkdirSync(__dirname + "/uploads", 0766, function(err){
			   if(err){ 
				 console.log(err);
				 response.send("ERROR! Can't make the directory! \n");    // echo the result back
			   }
			 });   
		 }
		 
		console.log('files request-----'+req.get('Authorization'));
		 
		 // parse a file upload
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			console.log('files content-----');
			console.log(JSON.stringify(files));
			//save the file
			fs.readFile(files.avatar.path, function (err, data) {
		
				console.log('file location----'+files.avatar.path);
				var file_ext = files.avatar.name;
				var count = file_ext.lastIndexOf('.');
				file_ext = file_ext.substring(count,file_ext.length);
				console.log('file extension----'+file_ext);
				//get the date and remove the :
				var date_today = new Date().toJSON();
				date_today = date_today.replace(":","-");
				date_today = date_today.replace(":","-");
				//make new save location
				var newPath = __dirname + "/uploads/"+files.avatar.name;
				fs.writeFile(newPath, data, function (err) {
					console.log('file save failed cause-----'+err);
					res.writeHead(200, {'content-type': 'text/plain'});
					res.write('received upload:\n\n');
					res.end(util.inspect({fields: fields, files: files}));
				});
			});
		  
		});
		
	});
}