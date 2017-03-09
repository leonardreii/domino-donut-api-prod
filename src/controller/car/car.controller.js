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
class CarController {
    constructor() {
        logging_service_1.Logging('Initialize Car Controller');
    }
    getCar(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var vCarName = (pRequest.body.carname == undefined || pRequest.body.carname == '') ? '' : pRequest.body.carname;
                var vPlateNo = (pRequest.body.plateno == undefined || pRequest.body.plateno == '') ? '' : pRequest.body.plateno;
                var vCapacity = (pRequest.body.capacity == undefined || pRequest.body.capacity == '') ? -1 : pRequest.body.capacity;
                var vPairStatus = (pRequest.body.pairstatus == undefined || pRequest.body.pairstatus == '') ? '' : pRequest.body.pairstatus;
                let vParam = {
                    pcarname: vCarName,
                    pplateno: vPlateNo,
                    pcapacity: vCapacity,
                    ppairstatus: vPairStatus
                };
                logging_service_1.Logging('vParam : ' + JSON.stringify(vParam));
                let payload = yield data_access_service_1.DataAccessService.executeSP('car_get', vParam);
                pResponse.status(200).send(payload);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
                }
            }
        });
    }
    pairCarDriver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.plateno == undefined || pRequest.body.plateno == '' ||
                    pRequest.body.driverid == undefined || pRequest.body.driverid == '') {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 53003, 'Invalid parameters - Unit Management');
                    return;
                }
                var vPlateNo = pRequest.body.plateno;
                var vDriverId = pRequest.body.driverid;
                let vParam = {
                    pcarid: vPlateNo,
                    pdriverid: vDriverId
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('car_driver_pairing', vParam);
                pResponse.status(200).send(payload[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
                }
            }
        });
    }
    addCar(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.plate_no == undefined || pRequest.body.car_details == undefined ||
                    pRequest.body.capacity == undefined || pRequest.body.created_by == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 8001, 'Invalid parameters - Car');
                    return;
                }
                var params = {
                    plate_no: pRequest.body.plate_no,
                    car_details: pRequest.body.car_details,
                    capacity: pRequest.body.capacity,
                    created_by: pRequest.body.created_by
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('car_add', params);
                pResponse.status(200).json(result[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'Error in adding car data');
                }
            }
        });
    }
    editCar(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.plate_no == undefined || pRequest.body.car_details == undefined ||
                    pRequest.body.capacity == undefined || pRequest.body.last_modified_by == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 8001, 'Invalid parameters - Car');
                    return;
                }
                var params = {
                    plate_no: pRequest.body.plate_no,
                    car_details: pRequest.body.car_details,
                    capacity: pRequest.body.capacity,
                    last_modified_by: pRequest.body.last_modified_by
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('car_edit', params);
                pResponse.status(200).json(result[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'Error in editing car data');
                }
            }
        });
    }
}
exports.CarController = CarController;
//# sourceMappingURL=car.controller.js.map