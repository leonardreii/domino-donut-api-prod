import { Logging } from './../../services/logging.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { DataAccessService } from './../../services/data-access.service';
import { DriverModel } from './../../model/driver.model';

//var request = require('request');
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

    async getDriverDetails(pRequest:any, pResponse:any){
        try {
            Logging("driverid : " + pRequest.params.driverid);
            if (pRequest.params.driverid == undefined || pRequest.params.driverid == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 3001, 'Invalid parameters - Driver');
                return;
            }
            var vDriverId = pRequest.params.driverid;
            var data = {
                pdriverid : vDriverId
            };
            let payload = await DataAccessService.executeSP('get_driverdetail',data, true);
            pResponse.status(200).send(payload);
        }
        catch (err) {
            Logging(err);
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2000, 'General error : ' + err);
            }
        }
    }
}