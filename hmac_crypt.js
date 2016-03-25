var crypto = require('crypto');
//print all the way to encrypt
//console.log(crypto.getCiphers());
var algs = [ 'md5','sha','sha1','sha256','sha512','RSA-SHA','RSA-SHA1','RSA-SHA256','RSA-SHA512'];
var key = "soli";

module.exports.encrypt = function(content, cd){
	
    var shasum = crypto.createHmac(algs[2],key);
    shasum.update(content);  
    var d = shasum.digest('hex');
	cd(d);
}

//hmacAlgorithm("this is a test.",function(result){ console.log(result); });