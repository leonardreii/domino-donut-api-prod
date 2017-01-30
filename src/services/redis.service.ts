import { Logging } from './logging.service';
import { ErrorHandlingService } from './error-handling.service';

import { DriverModel } from './../model/driver.model';
import { CustomerModel } from './../model/customer.model';

var vEnv = require('../config/mode.json')['mode'];
const vConfig = require('../config/config.json')[vEnv];
var redis = require('ioredis');
var bluebird = require("bluebird");
var vFs = require('fs');
var vToday = Date.now();
var vDate = new Date(vToday);

export class RedisService {
	public static client;
	public static geo;
	public static up = false;
	public static errordesc = "Error while establishing connection with redis";
	public static ACTIVE_DRIVER_LIST_NAME = "activedriverlist";
	public static INACTIVE_DRIVER_LIST_NAME = "inactivedrivrerlist";
	public static ONGOING_DRIVER_LIST_NAME = "ongoingdriverlist";

	constructor(){
		try{
			Logging("initialize redis service");
			let conf = vConfig.redis.redisConfig;
			conf.retry_unfulfilled_commands=false;
			conf.retry_strategy = function (options):any {
				Logging(options.error);
				RedisService.up = false;
				RedisService.errordesc = options.error;
				return Math.max(options.attempt * 100, 3000);
			};
            RedisService.client = bluebird.promisifyAll(redis.createClient(
				conf
			));
			RedisService.client.on("error",function(err){
				Logging('Error has been occured.');
			});
			RedisService.client.on("reconnecting",function(err){
				Logging('Reconnecting to redis server.');
			});
			RedisService.client.on("end",function(err){
				Logging('Redis connection has been closed.');
				RedisService.up = false;
			});
			RedisService.client.on("ready",function(err){
				Logging("Redis is up.");
				RedisService.up=true;
			});
			RedisService.client.on("connect",function(err){
				Logging("Redis is connected.");
				RedisService.up=true;
			});
			RedisService.geo = require('georedis').initialize(RedisService.client);
		}
		catch(pErr){
			Logging('Error while establishing database connection with redis : ' + pErr);
			throw 401;
		}
	}
	public static errorHandling(desc?){
		if(RedisService.up == false){
			Logging(RedisService.errordesc);
			if(desc == undefined)
				ErrorHandlingService.throwError(703,RedisService.errordesc);
			else
				ErrorHandlingService.throwError(703,desc);
		}
	}

	public static async refreshDriverList(pdriver:DriverModel){
		try{
			var listname="";
			var notlistname1="";
			var notlistname2="";
			if(pdriver.getStatus()=="active"){
				listname=RedisService.ACTIVE_DRIVER_LIST_NAME;
				notlistname1=RedisService.ONGOING_DRIVER_LIST_NAME;
				notlistname2=RedisService.INACTIVE_DRIVER_LIST_NAME
			}
			else if(pdriver.getStatus()=="inactive"){
				listname=RedisService.INACTIVE_DRIVER_LIST_NAME;
				notlistname1=RedisService.ACTIVE_DRIVER_LIST_NAME;
				notlistname2=RedisService.ONGOING_DRIVER_LIST_NAME;
			}
			else if(pdriver.getStatus()=="ongoing"){
				listname=RedisService.ONGOING_DRIVER_LIST_NAME;
				notlistname2=RedisService.ACTIVE_DRIVER_LIST_NAME;
				notlistname1=RedisService.INACTIVE_DRIVER_LIST_NAME;
			}
			RedisService.client.hset(listname,pdriver.getID(),pdriver.getLat()+','+pdriver.getLng());
			RedisService.client.hdel(notlistname1,pdriver.getID());
			RedisService.client.hdel(notlistname2,pdriver.getID());
		}
		catch(err){
			Logging(RedisService.errordesc + err);
			throw 401;
		}
	}
	public static async getActiveDriverList(){
		try{
			var result = await RedisService.client.hgetall(RedisService.ACTIVE_DRIVER_LIST_NAME);
			return result;
		}
		catch(err){
			Logging(RedisService.errordesc + err);
			throw 401;
		}
	}
}