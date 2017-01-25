import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { LocatorService } from './../../services/locator.service';
import { DataAccessService } from './../../services/data-access.service';
import { CustomerModel } from './../../model/customer.model';
import { DriverModel } from './../../model/driver.model';

var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';

export class CustomerController{
    constructor(){
        Logging('Initalize Customer Controller');
    }
    async findDriver(pRequest: any, pResponse: any){
        var customer:CustomerModel = new CustomerModel(pRequest.body.customerid,pRequest.body.lat, pRequest.body.lng);

        try{
            var driverList = await RedisService.getAvailableDriverList();

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
                pResponse.status(200).json({result:'Sorry, we couldn\'t find you a driver'});
            }
            else{
                RedisService.unregisterDriver(chosenDriver.getID());
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
                pResponse.status(200).json({result:response});
            }
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(err.desc, 1000, err.code, err.desc);
        }
    }
}