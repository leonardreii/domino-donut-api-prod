import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { LocatorService } from './../../services/locator.service';
import { GoogleAPIService } from './../../services/googleapi.service';
import { DataAccessService } from './../../services/data-access.service';
import { CustomerModel } from './../../model/customer.model';
import { DriverModel } from './../../model/driver.model';

var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';

export class CustomerController{
    constructor(){
        Logging('Initalize Customer Controller');
    }


    async estimateTrip(pRequest:any, pResponse:any){
        if(pRequest.body.latfrom==undefined||pRequest.body.lngfrom==undefined||
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
        if(pRequest.body.customerid==undefined||pRequest.body.pickuploc==undefined||
           pRequest.body.pickuplat==undefined||pRequest.body.pickuplng==undefined||
           pRequest.body.destname==undefined||pRequest.body.destlat==undefined||pRequest.body.destlng==undefined){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
            return;
        }
        var customer:CustomerModel = new CustomerModel(pRequest.body.customerid,pRequest.body.lat, pRequest.body.lng);
        
        try{
            // insert the order with empty driver
            var orderData={
                'custid': pRequest.body.customerid,
                'pickuploc': pRequest.body.pickuploc,
                'pickuplat': pRequest.body.pickuplat,
                'pickuplng': pRequest.body.pickuplng,
                'destname': pRequest.body.destname,
                'destlat': pRequest.body.destlat,
                'destlng': pRequest.body.destlng
            };
            let orderResult:any = await DataAccessService.executeSP('customer_make_order',orderData,false);
            Logging(JSON.stringify(orderResult));
            // find the driver
            var driverList = await RedisService.getActiveDriverList();
            var nearest=999999;
            var chosenDriver:DriverModel;
            for(let i in driverList){
                var driverloc = driverList[i];
                var driverlat = driverloc.split(',')[0];
                var driverlng = driverloc.split(',')[1];
                
                var km = LocatorService.countDistance(customer.getLat(),customer.getLng(),driverlat,driverlng);
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
                    'driverid':chosenDriver.getID()
                };
                let driverData:any = await DataAccessService.executeSP('driver_getdata',params,false);
                var response={
                    'driverid': chosenDriver.getID(),
                    'name':driverData[0].first_name+' '+driverData[0].last_name,
                    'phone':driverData[0].phone_number,
                    'rating':driverData[0].rating,
                    'plate_no':driverData[0].plate_no,
                    'lat':chosenDriver.getLat(),
                    'lng':chosenDriver.getLng()
                };
                
                let driverParams={
                    'orderid': orderResult.orderid,
                    'driverid': chosenDriver.getID(),
                    'plateno': driverData[0].plate_no
                };
                let result = await DataAccessService.executeSP('assign_driver',driverParams,false);
                pResponse.status(200).json({result:response});
            }
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2000, "Error in finding driver");
        }
    }
}