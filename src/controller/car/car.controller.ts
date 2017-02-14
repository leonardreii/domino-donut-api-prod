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
}