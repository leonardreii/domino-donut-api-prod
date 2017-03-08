import { Logging } from './../../services/logging.service';
import {ErrorHandlingService} from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { DataAccessService } from './../../services/data-access.service';
import { DriverModel } from './../../model/driver.model';
import { TokenModel } from './../../model/token.model';
//var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';

interface Socket{
    driver_id:string;
    socketid:string;
}

export class DriverController{
    constructor(){
        Logging('Initialize Driver Controller');
    }

    async updateSocket(pRequest: any, pResponse: any){
        try{
            Logging('asdasda');
            let vTokenObject: TokenModel = pResponse.locals.token;
            let vParam:Socket=pRequest.body;
            let vResult:any;
            if (vParam.socketid == undefined || vParam.socketid == null || vParam.socketid == ""){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                return;
            }
            vParam.driver_id = vTokenObject.getId();
            vResult = await DataAccessService.executeSP('update_socketid_driver', vParam);
            pResponse.status(200).send("Successfully update");
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
            }
        }
    }

    async updateDriver(pRequest: any, pResponse: any){
        if(pRequest.body.driver_id==undefined||pRequest.body.lat==undefined||
           pRequest.body.lng==undefined||pRequest.body.status==undefined){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
            return;
        }
        var driver:DriverModel = new DriverModel(pRequest.body.driver_id, pRequest.body.lat, pRequest.body.lng, pRequest.body.status);
        try{
            RedisService.refreshDriverList(driver);
            // for dummy data...
            // for(let i=0;i<500;i++){
            //     var temp:DriverModel = new DriverModel(i.toString(), 
            //                 6+i/1000+i/100+i/10+0.000013412,108+i/1000+i/100+i/10+0.000013412,"active");
            //     RedisService.refreshDriverList(temp);
            // }
            pResponse.status(200).json({result:'successful'});
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
            }
        }
    }

    async getDriverListPaging(pRequest:any, pResponse:any){
        try {
            if (pRequest.body.page == undefined || pRequest.body.page == null ||
                pRequest.body.row == undefined || pRequest.body.row == null ||
                pRequest.body.sortby == undefined || pRequest.body.sortby == null ||
                pRequest.body.sorttype == undefined || pRequest.body.sorttype == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
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
                if (err.code){
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else{
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        }
    }

    async getDriverDetails(pRequest:any, pResponse:any){
        try {
            Logging("driverid : " + pRequest.params.driverid);
            if (pRequest.params.driverid == undefined || pRequest.params.driverid == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
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
                if (err.code){
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else{
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        }
    }

    async getDriverSocketId(pRequest:any, pResponse:any){
        try {
            Logging("driverid : " + pRequest.params.driverid);
            // if (pRequest.params.driverid == undefined || pRequest.params.driverid == null) {
            //     ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
            // return;
            // }
            // var vDriverId = pRequest.params.driverid;
            var data = {
                // pdriverid : vDriverId
            };
            let payload = await DataAccessService.executeSP('driver_getsocketid',data);
            pResponse.status(200).send(payload[0]);
        }
        catch (err) {
            Logging(err);
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                if (err.code){
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else{
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        }
    }


    async getData(pRequest:any, pResponse:any)
    {
        try{
            var params={
                first_name: pRequest.body.first_name==undefined? '' : pRequest.body.first_name,
                last_name: pRequest.body.last_name==undefined? '' : pRequest.body.last_name,
                nik: pRequest.body.nik==undefined? '' : pRequest.body.nik,
                email: pRequest.body.email==undefined? '' : pRequest.body.email,
                phone_number: pRequest.body.phone_number==undefined? '' : pRequest.body.phone_number,
                status: pRequest.body.status==undefined? 'all' : pRequest.body.status
            };
            let result = await DataAccessService.executeSP('driver_get',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
            }
        }
    }

    async addDriver(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.first_name==undefined||pRequest.body.last_name==undefined||
                pRequest.body.nik==undefined||pRequest.body.email==undefined||
                pRequest.body.phone_number==undefined||pRequest.body.password==undefined||
                pRequest.body.created_by==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                return;
            }
            var params={
                first_name: pRequest.body.first_name==undefined? '' : pRequest.body.first_name,
                last_name: pRequest.body.last_name==undefined? '' : pRequest.body.last_name,
                nik: pRequest.body.nik==undefined? '' : pRequest.body.nik,
                email: pRequest.body.email==undefined? '' : pRequest.body.email,
                phone_number: pRequest.body.phone_number==undefined? '' : pRequest.body.phone_number,
                password: pRequest.body.password==undefined? '' : pRequest.body.password,
                created_by: pRequest.body.created_by==undefined? '' : pRequest.body.created_by
            };
            let result = await DataAccessService.executeSP('driver_add',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
            }
        }
    }

    async editDriver(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.driver_id==undefined||
                pRequest.body.first_name==undefined||pRequest.body.last_name==undefined||
                pRequest.body.nik==undefined||pRequest.body.email==undefined||
                pRequest.body.phone_number==undefined||pRequest.body.password==undefined||
                pRequest.body.last_modified_by==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                return;
            }
            var params={
                driver_id: pRequest.body.driver_id==undefined? '' : pRequest.body.driver_id,
                first_name: pRequest.body.first_name==undefined? '' : pRequest.body.first_name,
                last_name: pRequest.body.last_name==undefined? '' : pRequest.body.last_name,
                nik: pRequest.body.nik==undefined? '' : pRequest.body.nik,
                email: pRequest.body.email==undefined? '' : pRequest.body.email,
                phone_number: pRequest.body.phone_number==undefined? '' : pRequest.body.phone_number,
                password: pRequest.body.password==undefined? '' : pRequest.body.password,
                last_modified_by: pRequest.body.last_modified_by==undefined? '' : pRequest.body.last_modified_by
            };
            let result = await DataAccessService.executeSP('driver_edit',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
            }
        }
    }

    async deleteDriver(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.driver_id==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                return;
            }
            var params={
                driver_id: pRequest.body.driver_id
            };
            let result = await DataAccessService.executeSP('driver_delete',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
            }
        }
    }
}