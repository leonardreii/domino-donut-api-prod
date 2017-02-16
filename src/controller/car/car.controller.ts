import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { DataAccessService } from './../../services/data-access.service';

export class CarController{
    constructor(){
        Logging('Initialize Car Controller');
    }

    async getCar(pRequest:any, pResponse:any) {
        try {
            var vCarName = (pRequest.body.carname == undefined || pRequest.body.carname == '') ? '' : pRequest.body.carname;
            var vPlateNo = (pRequest.body.plateno == undefined || pRequest.body.plateno == '') ? '' : pRequest.body.plateno;
            var vCapacity = (pRequest.body.capacity == undefined || pRequest.body.capacity == '') ? -1 : pRequest.body.capacity;
            var vPairStatus = (pRequest.body.pairstatus == undefined || pRequest.body.pairstatus == '') ? '' : pRequest.body.pairstatus;

            let vParam = {
                pcarname : vCarName,
                pplateno : vPlateNo,
                pcapacity: vCapacity,
                ppairstatus : vPairStatus
            };

            Logging('vParam : ' + JSON.stringify(vParam));
            let payload = await DataAccessService.executeSP('car_get',vParam);

            pResponse.status(200).send(payload);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
            }
        }
    }

    async pairCarDriver(pRequest:any, pResponse:any) {
        try {
            if (pRequest.body.plateno == undefined || pRequest.body.plateno == '' ||
                pRequest.body.driverid == undefined || pRequest.body.driverid == '') {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 53003, 'Invalid parameters - Unit Management');
                return;
            }

            var vPlateNo = pRequest.body.plateno;
            var vDriverId = pRequest.body.driverid;
            
            let vParam = {
                pcarid : vPlateNo,
                pdriverid : vDriverId
            };

            let payload:any = await DataAccessService.executeSP('car_driver_pairing',vParam);

            pResponse.status(200).send(payload[0].result);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
            }
        }
    }
}