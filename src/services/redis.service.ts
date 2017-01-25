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
	public static availabledriverlist = "availabledriver";
	public static ongoingdriverlist = "ongoingdriver";

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

	public static async registerDriver(pdriver:DriverModel){
		try{
			RedisService.client.hset(RedisService.availabledriverlist,pdriver.getID(),pdriver.getLat()+','+pdriver.getLng());
		}
		catch(err){
			Logging(RedisService.errordesc + err);
			throw 401;
		}
	}
	public static async unregisterDriver(pdriverid:string){
		try{
			RedisService.client.hdel(RedisService.availabledriverlist,pdriverid);
		}
		catch(err){
			Logging(RedisService.errordesc + err);
			throw 401;
		}
	}
	public static async getAvailableDriverList(){
		try{
			var result = await RedisService.client.hgetall(RedisService.availabledriverlist);
			return result;
		}
		catch(err){
			Logging(RedisService.errordesc + err);
			throw 401;
		}
	}
}