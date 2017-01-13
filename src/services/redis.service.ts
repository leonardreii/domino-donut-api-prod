import {Logging} from './logging.service';
import {ErrorHandlingService} from './error-handling.service';
var vEnv = require('../config/mode.json')['mode'];
const vConfig = require('../config/config.json')[vEnv];
var redis = require('ioredis');
var bluebird = require("bluebird");
var vFs = require('fs');
var vToday = Date.now();
var vDate = new Date(vToday);

export class RedisService {
	public static client;
	public static up = false;
	public static errordesc = "Error while establishing database connection with redis";

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

	public static async setVal(val,key,time?){
		try{
			RedisService.errorHandling();
			let setResponse = await RedisService.client.setAsync(key,val);
			if(time != undefined && time != "" && time != null){
				let expireResponse = await RedisService.client.expireatAsync(key, time);
			}
			return true;
		}
		catch(pErr){
			ErrorHandlingService.throwError(703,'Error while set data to redis');
			return false;
		}
	}

	public static async getVal(key){
		try{
			RedisService.errorHandling();
			//var data = RedisService.timeLimited(RedisService.client.getAsync(key),5500);
			var data = await RedisService.client.getAsync(key);
			return data;
		}
		catch(pErr){
			Logging(pErr);
			ErrorHandlingService.throwError(703,'Error while retrieve data to redis');
			return null;
		}
	}

	public static async checkExists(val){
		try{
			RedisService.errorHandling();
			var data = await RedisService.client.existsAsync(val);
			return data;
		}catch(pErr){
			ErrorHandlingService.throwError(703,'Error while check data to redis');
			return null;
		}
	}
	public static async delSpecificKey(key){
		try{
		RedisService.errorHandling();
		await RedisService.client.delAsync(key);
		}
		catch(pErr){
			ErrorHandlingService.throwError(703,'Error while delete data from redis');
			return null;
		}
	}
	public static async delKey(key_msisdn){
		// Example syntax delKey('6281910110748');
		try{
		RedisService.errorHandling();
		let attributes = vConfig.redis.attributes;
		let delResponse=[];
			for (var i in attributes){
				delResponse[i] = await RedisService.client.delAsync(key_msisdn+":"+attributes[i]);
			}
			return delResponse;
		}
		catch(pErr){
			ErrorHandlingService.throwError(703,'Error while delete data from redis');
			return null;
		}
	}
}