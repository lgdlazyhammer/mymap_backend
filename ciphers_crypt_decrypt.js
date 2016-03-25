var crypto = require('crypto');
//print all the way to encrypt
//console.log(crypto.getCiphers());
var algs = ['blowfish','aes-256-cbc','cast','des','des3','idea','rc2','rc4','seed'];
var key = "uoy";
//encrypt
module.exports.encrypt = function(buf, cb){
    var encrypted = "";
    var cip = crypto.createCipher(algs[7], key);
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    cb(encrypted);
}

//decrypt
module.exports.decrypt = function(encrypted, cb){
    var decrypted = "";
    var decipher = crypto.createDecipher(algs[7], key);
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    cb(decrypted);
}

/*cipher("this is a test",function(result){ 
	console.log(result);
	decipher(result, function(result2){ console.log(result2);});
});*/