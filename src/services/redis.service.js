"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./logging.service");
const error_handling_service_1 = require("./error-handling.service");
var vEnv = require('../config/mode.json')['mode'];
const vConfig = require('../config/config.json')[vEnv];
var redis = require('ioredis');
var bluebird = require("bluebird");
var vFs = require('fs');
var vToday = Date.now();
var vDate = new Date(vToday);
class RedisService {
    constructor() {
        try {
            logging_service_1.Logging("initialize redis service");
            let conf = vConfig.redis.redisConfig;
            conf.retry_unfulfilled_commands = false;
            conf.retry_strategy = function (options) {
                logging_service_1.Logging(options.error);
                RedisService.up = false;
                RedisService.errordesc = options.error;
                return Math.max(options.attempt * 100, 3000);
            };
            RedisService.client = bluebird.promisifyAll(redis.createClient(conf));
            RedisService.client.on("error", function (err) {
                logging_service_1.Logging('Error has been occured.');
            });
            RedisService.client.on("reconnecting", function (err) {
                logging_service_1.Logging('Reconnecting to redis server.');
            });
            RedisService.client.on("end", function (err) {
                logging_service_1.Logging('Redis connection has been closed.');
                RedisService.up = false;
            });
            RedisService.client.on("ready", function (err) {
                logging_service_1.Logging("Redis is up.");
                RedisService.up = true;
            });
            RedisService.client.on("connect", function (err) {
                logging_service_1.Logging("Redis is connected.");
                RedisService.up = true;
            });
        }
        catch (pErr) {
            logging_service_1.Logging('Error while establishing database connection with redis : ' + pErr);
            throw 401;
        }
    }
    static errorHandling(desc) {
        if (RedisService.up == false) {
            logging_service_1.Logging(RedisService.errordesc);
            if (desc == undefined)
                error_handling_service_1.ErrorHandlingService.throwError(703, RedisService.errordesc);
            else
                error_handling_service_1.ErrorHandlingService.throwError(703, desc);
        }
    }
    static refreshDriverList(pdriver) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var listname = "";
                var notlistname1 = "";
                var notlistname2 = "";
                if (pdriver.getStatus() == "active") {
                    listname = RedisService.ACTIVE_DRIVER_LIST_NAME;
                    notlistname1 = RedisService.ONGOING_DRIVER_LIST_NAME;
                    notlistname2 = RedisService.INACTIVE_DRIVER_LIST_NAME;
                }
                else if (pdriver.getStatus() == "inactive") {
                    listname = RedisService.INACTIVE_DRIVER_LIST_NAME;
                    notlistname1 = RedisService.ACTIVE_DRIVER_LIST_NAME;
                    notlistname2 = RedisService.ONGOING_DRIVER_LIST_NAME;
                }
                else if (pdriver.getStatus() == "ongoing") {
                    listname = RedisService.ONGOING_DRIVER_LIST_NAME;
                    notlistname2 = RedisService.ACTIVE_DRIVER_LIST_NAME;
                    notlistname1 = RedisService.INACTIVE_DRIVER_LIST_NAME;
                }
                RedisService.client.hset(listname, pdriver.getID(), pdriver.getLat() + ',' + pdriver.getLng());
                RedisService.client.hdel(notlistname1, pdriver.getID());
                RedisService.client.hdel(notlistname2, pdriver.getID());
            }
            catch (err) {
                logging_service_1.Logging(RedisService.errordesc + err);
                throw 401;
            }
        });
    }
    static getActiveDriverList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result = yield RedisService.client.hgetall(RedisService.ACTIVE_DRIVER_LIST_NAME);
                return result;
            }
            catch (err) {
                logging_service_1.Logging(RedisService.errordesc + err);
                throw 401;
            }
        });
    }
}
RedisService.up = false;
RedisService.errordesc = "Error while establishing connection with redis";
RedisService.ACTIVE_DRIVER_LIST_NAME = "activedriverlist";
RedisService.INACTIVE_DRIVER_LIST_NAME = "inactivedrivrerlist";
RedisService.ONGOING_DRIVER_LIST_NAME = "ongoingdriverlist";
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map