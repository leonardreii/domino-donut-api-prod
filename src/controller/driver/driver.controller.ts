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

    async updateDriver(pRequest: any, pResponse: any){
        var driver:DriverModel = new DriverModel(pRequest.body.driverid, pRequest.body.lat, pRequest.body.lng, pRequest.body.status);
        try{
            RedisService.refreshDriverList(driver);
            pResponse.status(200).json({result:'successful'});
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 2000, "Error updating driver data");
        }
    }
}