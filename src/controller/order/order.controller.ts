import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { DataAccessService } from './../../services/data-access.service';

export class OrderController {
    constructor(){
        Logging('Initalize Order Controller');
    }

    async CancelOrder(pRequest: any, pResponse: any){
        try {
            if (pRequest.body.orderid == undefined || pRequest.body.orderid == null ||
                pRequest.body.orderstatus == undefined || pRequest.body.orderstatus == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 2001, 'Invalid parameters - Order');
                return;
            }
            var vOrderId = pRequest.body.orderid;
            var vOrderStatus = pRequest.body.orderstatus;

            var data = {
                porderid : vOrderId,
                porderstatus : vOrderStatus
            };

            let payload = await DataAccessService.executeSP('update_orderstatus',data, true);
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