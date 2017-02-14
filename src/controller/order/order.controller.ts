import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { DataAccessService } from './../../services/data-access.service';

export class OrderController {
    constructor(){
        Logging('Initalize Order Controller');
    }

    async cancelOrder(pRequest: any, pResponse: any){
        try {
            if (pRequest.body.orderid == undefined || pRequest.body.orderid == '' ||
                pRequest.body.modifiedby == undefined || pRequest.body.modifiedby == '') {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 2001, 'Invalid parameters - Order');
                return;
            }
            var vOrderId = pRequest.body.orderid;
            var vModifiedBy = pRequest.body.modifiedby;

            var data = {
                porderid : vOrderId,
                pmodifiedby : vModifiedBy
            };

            let payload:any = await DataAccessService.executeSP('order_cancel',data);
            pResponse.status(200).send(payload[0].result);
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