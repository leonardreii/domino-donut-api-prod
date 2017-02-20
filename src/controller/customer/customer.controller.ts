import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { LocatorService } from './../../services/locator.service';
import { GoogleAPIService } from './../../services/googleapi.service';
import { DataAccessService } from './../../services/data-access.service';
import { CustomerModel } from './../../model/customer.model';
import { DriverModel } from './../../model/driver.model';
import { TokenModel } from './../../model/token.model';
import { WebSocketService } from './../../services/websocket.service';

var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';
interface Socket{
    employee_id:string;
    socketid:string;
}

export class CustomerController{
    constructor(){
        Logging('Initalize Customer Controller');
    }

    async updateSocket(pRequest: any, pResponse: any){
        try{
            let vTokenObject: TokenModel = pResponse.locals.token;
            let vParam:Socket=pRequest.body;
            let vResult:any;
            if (vParam.socketid == undefined || vParam.socketid == null || vParam.socketid == ""){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 100, 'Invalid parameter');
                return;
            }
            vParam.employee_id = vTokenObject.getId();
            vResult = await DataAccessService.executeSP('update_socketid_employee', vParam);
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

    async estimateTrip(pRequest:any, pResponse:any){
        if(pRequest.body.latfrom==undefined||pRequest.body.slngfrom==undefined||
                pRequest.body.latto==undefined||pRequest.body.lngto==undefined||pRequest.body.units==undefined){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
            return;      
        }
        try{
            // response sent by the GoogleAPIService                       hereee
            var tripEstimation = await GoogleAPIService.getTripEstimation(pResponse,pRequest.body.latfrom, pRequest.body.lngfrom, 
                                                    pRequest.body.latto, pRequest.body.lngto,pRequest.body.units);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1000, "Error in estimating trip");
        }
    }
    async findDriver(pRequest:any, pResponse:any){
        if(pRequest.body.employee_id==undefined||pRequest.body.pickuploc==undefined||
           pRequest.body.pickuplat==undefined||pRequest.body.pickuplng==undefined||
           pRequest.body.destname==undefined||pRequest.body.destlat==undefined||pRequest.body.destlng==undefined){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
            return;
        }
        var customer:CustomerModel = new CustomerModel(pRequest.body.customerid,pRequest.body.pickuplat, pRequest.body.pickuplng);
        
        try{
            // insert the order with empty driver
            let vTokenObject: TokenModel = pResponse.locals.token;
            var orderData={
                employee_id: pRequest.body.employee_id,
                pickup_location: pRequest.body.pickuploc,
                pickup_lat: pRequest.body.pickuplat,
                pickup_lng: pRequest.body.pickuplng,
                destination_name: pRequest.body.destname,
                destination_lat: pRequest.body.destlat,
                destination_lng: pRequest.body.destlng
            };
            let orderResult:any = await DataAccessService.executeSP('employee_makeorder',orderData);
            Logging(JSON.stringify(orderResult));
            // find the driver
            var driverList = await RedisService.getActiveDriverList();
            var nearest=999999;
            var chosenDriver:DriverModel;
            Logging("Searching for driver..");
            for(let i in driverList){
                var driverloc = driverList[i];
                var driverlat = driverloc.split(',')[0];
                var driverlng = driverloc.split(',')[1];
                
                var km = LocatorService.countDistance(customer.getLat(),customer.getLng(),driverlat,driverlng);
                // Logging("current distance: "+km+", nearest: "+nearest);
                if(km<nearest){
                    nearest=km;
                    chosenDriver=new DriverModel(i,driverlat,driverlng);
                }
            }

            if(nearest==999999){
                pResponse.status(200).json({result:'No driver available at this moment'});
            }
            else{
                chosenDriver.setStatus("ongoing");
                RedisService.refreshDriverList(chosenDriver);
                
                var params = {
                    driver_id:chosenDriver.getID()
                };
                let driverData:any = await DataAccessService.executeSP('driver_getdetails',params);
                if(driverData!=null){
                    var response={
                        'driver_id': chosenDriver.getID(),
                        'name':driverData[0].first_name+' '+driverData[0].last_name,
                        'phone_number':driverData[0].phone_number,
                        'rating':driverData[0].rating,
                        'plate_no':driverData[0].plate_no,
                        'lat':chosenDriver.getLat(),
                        'lng':chosenDriver.getLng()
                    };
                    
                    let driverParams={
                        order_id: orderResult[0].order_id,
                        driver_id: chosenDriver.getID(),
                        plate_no: driverData[0].plate_no
                    };
                    let result = await DataAccessService.executeSP('order_assign_driver',driverParams);
                    let vParams={
                        employee_id: vTokenObject.getId()
                    };
                    result = await DataAccessService.executeSP('employee_getdetails',vParams);
                    WebSocketService.sockets[driverData[0].socket_id].emit('incomingOrder', result[0]);
                    pResponse.status(200).json(response);
                }
                else{
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 4002, "Driver id is not found in DB");
                }
            }
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2000, "Error in finding driver");
            }
        }
    }

    async getEmployeeList(pRequest: any, pResponse: any){
        try {
            var vEmployeeName = (pRequest.body.employeename == undefined) ? '' : pRequest.body.employeename;
            var vNIK = (pRequest.body.nik == undefined) ? '' : pRequest.body.nik;
            var vEmail = (pRequest.body.email == undefined) ? '' : pRequest.body.email;
            var vPhoneNum = (pRequest.body.phone == undefined) ? '' : pRequest.body.phone;
            var vCorporateName = (pRequest.body.corporatename == undefined) ? '' : pRequest.body.corporatename;
            
            let vData = {
                pname : vEmployeeName,
                pnik : vNIK,
                pemail : vEmail,
                pphonenumber : vPhoneNum,
                pcorporatename : vCorporateName
            };

            let payload = await DataAccessService.executeSP('employee_get',vData);
            pResponse.status(200).send(payload);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, 'General error : ' + err);
            }
        }
    }

    async getDetails(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.employee_id==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter - Customer");
                return;
            }
            var params={
                employee_id: pRequest.body.employee_id
            };
            let result:any = await DataAccessService.executeSP('employee_getdetails',params);
            pResponse.status(200).json(result[0]);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2008, "Error in  retrieving details data");
        }
    }
    async getUser(pRequest:any, pResponse:any){
        try{
            var params={
                username: pRequest.body.username,
                role_id: pRequest.body.roleid
            };
            let result:any = await DataAccessService.executeSP('user_get',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2004, "Error in retreiving user data");
        }
    }

    async getHistory(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.employee_id==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
                return;
            }
            var params={
                employee_id: pRequest.body.employee_id
            };
            let result:any = await DataAccessService.executeSP('customer_history',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2004, "Error in retreiving customer history");
        }
    }
}