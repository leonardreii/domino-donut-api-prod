"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require('crypto-js');
var vEnv = require('../config/mode.json')['mode'];
var config = require('../config/config.json')[vEnv];
class EncryptionService {
    constructor() {
    }
    getEncrypted(pWords) {
        if (!config.encryption)
            return pWords;
        return CryptoJS.AES.encrypt(pWords, config.encryption_key).toString();
    }
    getDecrypted(pWords) {
        if (!config.encryption)
            return pWords;
        return CryptoJS.AES.decrypt(pWords, config.encryption_key).toString(CryptoJS.enc.Utf8);
    }
}
exports.EncryptionService = EncryptionService;
//# sourceMappingURL=encryption.service.js.map