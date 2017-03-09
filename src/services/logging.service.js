"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vEnv = require('../config/mode.json')['mode'];
const enableLogging = require('../config/config.json')[vEnv]['debug'];
var ErrorConfig = require('../config/error.json');
var fs = require('fs');
var moment = require('moment');
function Logging(msg) {
    if (enableLogging) {
        var time = moment().format('DD-MMM-YYYY, hh:mm:ss a');
        console.log(`${time} | ${Object.prototype.toString.call(msg) == "[object Object]" ||
            Object.prototype.toString.call(msg) == "[object Array]" ? JSON.stringify(msg) : msg}`);
    }
}
exports.Logging = Logging;
//# sourceMappingURL=logging.service.js.map