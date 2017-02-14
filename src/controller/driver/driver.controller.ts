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

    async updateDriver(pRequest: any, pResponse: any){
        if(pRequest.body.driverid==undefined||pRequest.body.lat==undefined||
           pRequest.body.lng==undefined||pRequest.body.status==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 3001, 'Invalid parameters - Driver');
                return;
        }
        var driver:DriverModel = new DriverModel(pRequest.body.driverid, pRequest.body.lat, pRequest.body.lng, pRequest.body.status);
        try{
            RedisService.refreshDriverList(driver);
            // for dummy data...
            // for(let i=0;i<500;i++){
            //     var temp:DriverModel = new DriverModel(i.toString(), 
            //                 6+i/1000+i/100+i/10+0.000013412,108+i/1000+i/100+i/10+0.000013412,"active");
            //     RedisService.refreshDriverList(temp);
            // }
            // pResponse.status(200).json({result:'successful'});
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 2000, "Error updating driver data");
        }
    }

    async getDriverListPaging(pRequest:any, pResponse:any){
        try {
            if (pRequest.body.page == undefined || pRequest.body.page == null ||
                pRequest.body.row == undefined || pRequest.body.row == null ||
                pRequest.body.sortby == undefined || pRequest.body.sortby == null ||
                pRequest.body.sorttype == undefined || pRequest.body.sorttype == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 3001, 'Invalid parameters - Driver');
                return;
            }

            var vFirstName = pRequest.body.firstname;
            var vLocation = pRequest.body.location;
            var vonlineStatus = pRequest.body.onlinestatus;

            let vData:any = new DriverModel().getDriverBody(null, vFirstName, null,null,null,null,vLocation,null,vonlineStatus);

            vData['ppage'] = pRequest.body.page;
            vData['prow'] = pRequest.body.row;
            vData['psortby'] = pRequest.body.sortby;
            vData['psorttype'] = pRequest.body.sorttype;

            let payload = await DataAccessService.executeSP('get_driverlistpaging',vData);
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
            let payload = await DataAccessService.executeSP('driver_getdetail',data);
            pResponse.status(200).send(payload[0]);
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


    async getData(pRequest:any, pResponse:any){
        try{
            var params={

            };
            //let result = await DataAccessService.executeSP();
        }
        catch(err){

        }
    }
}