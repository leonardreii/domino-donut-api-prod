'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const logging_service_1 = require("./services/logging.service");
const sequelize_service_1 = require("./services/sequelize.service");
const encryption_service_1 = require("./services/encryption.service");
const websocket_service_1 = require("./services/websocket.service");
var express = require('express');
var vEnv = require('./config/mode.json')['mode'];
var bodyParser = require('body-parser');
var vValidator = require('validator');
var config = require('./config/config.json')[vEnv];
const app = express();
const router = express.Router();
const port = config.port || 4000;
let seq = new sequelize_service_1.SequelizeService();
let enc = new encryption_service_1.EncryptionService();
// let red: RedisService = new RedisService();
let ws = new websocket_service_1.WebSocketService(app);
let allow;
let whiteList = (origin) => {
    var data = config.whitelist_domain;
    for (let i in data) {
        if (origin == data[i])
            return origin;
    }
    if (data.length == 0)
        return null;
    else
        return data[0];
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    //update
    let origin = req.get('origin');
    let vOrigin = origin; //whiteList(origin);
    res.header("Access-Control-Allow-Origin", vOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,authorization,Proxy-Authorization,X-session");
    res.header("Access-Control-Expose-Headers", "accessToken,created,Content-Disposition");
    res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
    res.header("X-XSS-Protection", "1");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Content-Security-Policy", "object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
    logging_service_1.Logging('incoming request host : ' + req.headers.host);
    logging_service_1.Logging('Incoming request method : ' + req.method);
    logging_service_1.Logging('Incoming request path : ' + req.path);
    logging_service_1.Logging('cookies : ' + JSON.stringify(req.cookies));
    let encryption = config.encryption;
    let f = res.send;
    let f2 = res.json;
    if (encryption) {
        res.json = function (param) {
            var data = param;
            data = enc.getEncrypted(JSON.stringify(data));
            f.call(this, data);
        };
        res.send = function (param) {
            var data = param;
            var param2 = this.encrypt;
            if (param2 == undefined && Object.prototype.toString.call(data) == "[object Object]")
                data = JSON.stringify(data);
            else if (param2 == undefined && Object.prototype.toString.call(data) == "[object Array]")
                data = JSON.stringify(data);
            if (param2 == undefined)
                data = enc.getEncrypted(data);
            f.call(this, data);
        };
    }
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        // ----------------------------------------------------------
        // Here below the Decryptin logic
        logging_service_1.Logging("req.body         : " + req.body);
        if (req.body.encoded != undefined) {
            logging_service_1.Logging("req.body.encoded : " + req.body.encoded);
            if (config.encryption)
                req.body = req.body.encoded.replace(/ /g, '+');
            else
                req.body = req.body.encoded;
            req.body = enc.getDecrypted(req.body);
            logging_service_1.Logging("req.body replace : " + req.body);
            // replace ',' separator with ';'
            var temp = "";
            var kar = '';
            for (let i = 0; i < req.body.length; i++) {
                kar = req.body[i];
                if (kar == ',') {
                    var isSeparator = function () {
                        for (let j = i + 1; j < req.body.length; j++) {
                            if (req.body[j] == ',') {
                                return false;
                            }
                            if (req.body[j] == '=') {
                                return true;
                            }
                        }
                        return true;
                    };
                    if (isSeparator()) {
                        kar = ';';
                    }
                }
                temp += kar;
            }
            req.body = temp;
            //req.body=req.body.replace(/,/g,';');
            logging_service_1.Logging(req.body);
            req.body = req.body.replace(/{|}/g, '');
            logging_service_1.Logging(req.body);
            // convert string to JSON Object
            var y = {};
            req.body.split(';').map(function (i) {
                return i.split('=');
            }).forEach(function (j) {
                y[j[0].trim()] = j[1];
            });
            logging_service_1.Logging(y);
            req.body = y;
        }
        else if (req.body.json != undefined) {
            if (config.encryption)
                req.body = req.body.json.replace(/ /g, '+');
            else
                req.body = req.body.json;
            logging_service_1.Logging(req.body);
            req.body = enc.getDecrypted(req.body);
            logging_service_1.Logging(req.body);
            req.body = JSON.parse(req.body);
        }
        // ---------------------------------------------------------------
        for (let param in req.body) {
            if (typeof req.body[param] === 'string')
                req.body[param] = vValidator.escape(req.body[param]);
        }
    }
    else if (req.method === 'GET') {
        for (let param in req.query) {
            if (typeof req.query[param] === 'string')
                req.query[param] = vValidator.escape(req.query[param]);
        }
        for (let param in req.params) {
            if (typeof req.params[param] === 'string')
                req.params[param] = vValidator.escape(req.params[param]);
        }
    }
    next();
});
route_1.Routing(router);
app.use('/api', router);
ws.Listen(port);
logging_service_1.Logging('listening : ' + port);
//# sourceMappingURL=main.js.map