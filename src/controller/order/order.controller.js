"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./../../services/logging.service");
const error_handling_service_1 = require("../../services/error-handling.service");
const data_access_service_1 = require("./../../services/data-access.service");
class OrderController {
    constructor() {
        logging_service_1.Logging('Initalize Order Controller');
    }
    cancelOrder(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.orderid == undefined || pRequest.body.orderid == '' ||
                    pRequest.body.modifiedby == undefined || pRequest.body.modifiedby == '') {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 2001, 'Invalid parameters - Order');
                    return;
                }
                var vOrderId = pRequest.body.orderid;
                var vModifiedBy = pRequest.body.modifiedby;
                var data = {
                    porderid: vOrderId,
                    pmodifiedby: vModifiedBy
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('order_cancel', data);
                pResponse.status(200).send(payload[0].result);
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2000, 'General error : ' + err);
                }
            }
        });
    }
    setDriverRating(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.orderid == undefined || pRequest.body.orderid == '' ||
                    pRequest.body.driverrating == undefined || pRequest.body.driverrating == '') {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 2001, 'Invalid parameters - Order');
                    return;
                }
                var vOrderId = pRequest.body.orderid;
                var vdriverrating = pRequest.body.driverrating;
                let vParam = {
                    porderid: vOrderId,
                    pdriverrating: vdriverrating
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('order_set_driverrating', vParam);
                pResponse.status(200).send(payload[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2000, 'General error : ' + err);
                }
            }
        });
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map