import { Logging } from './../../services/logging.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';

import { DriverModel } from './../../model/driver.model';

var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';

export class DriverController{
    constructor(){
        Logging('Initialize Driver Controller');
    }

    async registerDriver(pRequest: any, pResponse: any){
        var driver:DriverModel = new DriverModel(pRequest.body.driverid, pRequest.body.lat, pRequest.body.lng);
        try{
            RedisService.registerDriver(driver);
            pResponse.status(200).json({result:'successful'});
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(err.desc, 1000, err.code, err.desc);
        }
    }
    async unregisterDriver(pRequest:any, pResponse:any){
        try{
            RedisService.unregisterDriver(pRequest.body.driverid);
            pResponse.status(200).json({result:'successful'});
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(err.desc, 1000, err.code, err.desc);
        }
    }
}