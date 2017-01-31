import {DataAccessService} from './data-access.service';
import {TokenModel} from '../model/token.model';
declare var require:any;
var vEnv = require('../config/mode.json')['mode'];
const enableLogging = require('../config/config.json')[vEnv]['debug'];
var ErrorConfig = require('../config/error.json');
var fs = require('fs');
var moment = require('moment');
export function Logging(msg:any) {
    if (enableLogging) {
        var time = moment().format('DD-MMM-YYYY, hh:mm:ss a');
        console.log(`${time} | ${Object.prototype.toString.call(msg) == "[object Object]" ||
        Object.prototype.toString.call(msg) == "[object Array]" ? JSON.stringify(msg) : msg }`);
    }
}
