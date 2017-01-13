declare var CryptoJS: any;
var CryptoJS = require('crypto-js');
var vEnv = require('../config/mode.json')['mode'];
var config = require('../config/config.json')[vEnv];

export class EncryptionService {
	constructor() {
	}

	getEncrypted(pWords: string){
		if(!config.encryption)
			return pWords;
		return CryptoJS.AES.encrypt(pWords, config.encryption_key).toString();
	}
	getDecrypted(pWords: string){
		if(!config.encryption)
			return pWords;
		return CryptoJS.AES.decrypt(pWords, config.encryption_key).toString(CryptoJS.enc.Utf8);
	}
}