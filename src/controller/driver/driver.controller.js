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
const redis_service_1 = require("./../../services/redis.service");
const data_access_service_1 = require("./../../services/data-access.service");
const driver_model_1 = require("./../../model/driver.model");
//var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';
class DriverController {
    constructor() {
        logging_service_1.Logging('Initialize Driver Controller');
    }
    updateSocket(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logging_service_1.Logging('asdasda');
                let vTokenObject = pResponse.locals.token;
                let vParam = pRequest.body;
                let vResult;
                if (vParam.socketid == undefined || vParam.socketid == null || vParam.socketid == "") {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                    return;
                }
                vParam.driver_id = vTokenObject.getId();
                vResult = yield data_access_service_1.DataAccessService.executeSP('update_socketid_driver', vParam);
                pResponse.status(200).send("Successfully update");
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        });
    }
    updateDriver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pRequest.body.driver_id == undefined || pRequest.body.lat == undefined ||
                pRequest.body.lng == undefined || pRequest.body.status == undefined) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                return;
            }
            var driver = new driver_model_1.DriverModel(pRequest.body.driver_id, pRequest.body.lat, pRequest.body.lng, pRequest.body.status);
            try {
                redis_service_1.RedisService.refreshDriverList(driver);
                // for dummy data...
                // for(let i=0;i<500;i++){
                //     var temp:DriverModel = new DriverModel(i.toString(), 
                //                 6+i/1000+i/100+i/10+0.000013412,108+i/1000+i/100+i/10+0.000013412,"active");
                //     RedisService.refreshDriverList(temp);
                // }
                pResponse.status(200).json({ result: 'successful' });
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        });
    }
    getDriverListPaging(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.page == undefined || pRequest.body.page == null ||
                    pRequest.body.row == undefined || pRequest.body.row == null ||
                    pRequest.body.sortby == undefined || pRequest.body.sortby == null ||
                    pRequest.body.sorttype == undefined || pRequest.body.sorttype == null) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                    return;
                }
                var vFirstName = pRequest.body.firstname;
                var vLocation = pRequest.body.location;
                var vonlineStatus = pRequest.body.onlinestatus;
                let vData = new driver_model_1.DriverModel().getDriverBody(null, vFirstName, null, null, null, null, vLocation, null, vonlineStatus);
                vData['ppage'] = pRequest.body.page;
                vData['prow'] = pRequest.body.row;
                vData['psortby'] = pRequest.body.sortby;
                vData['psorttype'] = pRequest.body.sorttype;
                let payload = yield data_access_service_1.DataAccessService.executeSP('get_driverlistpaging', vData);
                pResponse.status(200).send(payload);
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    if (err.code) {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                    }
                    else {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                    }
                }
            }
        });
    }
    getDriverDetails(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logging_service_1.Logging("driverid : " + pRequest.params.driverid);
                if (pRequest.params.driverid == undefined || pRequest.params.driverid == null) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                    return;
                }
                var vDriverId = pRequest.params.driverid;
                var data = {
                    pdriverid: vDriverId
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('driver_getdetail', data);
                pResponse.status(200).send(payload[0]);
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    if (err.code) {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                    }
                    else {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                    }
                }
            }
        });
    }
    getDriverSocketId(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logging_service_1.Logging("driverid : " + pRequest.params.driverid);
                // if (pRequest.params.driverid == undefined || pRequest.params.driverid == null) {
                //     ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                // return;
                // }
                // var vDriverId = pRequest.params.driverid;
                var data = {
                // pdriverid : vDriverId
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('driver_getsocketid', data);
                pResponse.status(200).send(payload[0]);
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    if (err.code) {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                    }
                    else {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                    }
                }
            }
        });
    }
    getData(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var params = {
                    first_name: pRequest.body.first_name == undefined ? '' : pRequest.body.first_name,
                    last_name: pRequest.body.last_name == undefined ? '' : pRequest.body.last_name,
                    nik: pRequest.body.nik == undefined ? '' : pRequest.body.nik,
                    email: pRequest.body.email == undefined ? '' : pRequest.body.email,
                    phone_number: pRequest.body.phone_number == undefined ? '' : pRequest.body.phone_number,
                    status: pRequest.body.status == undefined ? 'all' : pRequest.body.status
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('driver_get', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        });
    }
    addDriver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.first_name == undefined || pRequest.body.last_name == undefined ||
                    pRequest.body.nik == undefined || pRequest.body.email == undefined ||
                    pRequest.body.phone_number == undefined || pRequest.body.password == undefined ||
                    pRequest.body.created_by == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                    return;
                }
                var params = {
                    first_name: pRequest.body.first_name == undefined ? '' : pRequest.body.first_name,
                    last_name: pRequest.body.last_name == undefined ? '' : pRequest.body.last_name,
                    nik: pRequest.body.nik == undefined ? '' : pRequest.body.nik,
                    email: pRequest.body.email == undefined ? '' : pRequest.body.email,
                    phone_number: pRequest.body.phone_number == undefined ? '' : pRequest.body.phone_number,
                    password: pRequest.body.password == undefined ? '' : pRequest.body.password,
                    created_by: pRequest.body.created_by == undefined ? '' : pRequest.body.created_by
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('driver_add', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        });
    }
    editDriver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.driver_id == undefined ||
                    pRequest.body.first_name == undefined || pRequest.body.last_name == undefined ||
                    pRequest.body.nik == undefined || pRequest.body.email == undefined ||
                    pRequest.body.phone_number == undefined || pRequest.body.password == undefined ||
                    pRequest.body.last_modified_by == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                    return;
                }
                var params = {
                    driver_id: pRequest.body.driver_id == undefined ? '' : pRequest.body.driver_id,
                    first_name: pRequest.body.first_name == undefined ? '' : pRequest.body.first_name,
                    last_name: pRequest.body.last_name == undefined ? '' : pRequest.body.last_name,
                    nik: pRequest.body.nik == undefined ? '' : pRequest.body.nik,
                    email: pRequest.body.email == undefined ? '' : pRequest.body.email,
                    phone_number: pRequest.body.phone_number == undefined ? '' : pRequest.body.phone_number,
                    password: pRequest.body.password == undefined ? '' : pRequest.body.password,
                    last_modified_by: pRequest.body.last_modified_by == undefined ? '' : pRequest.body.last_modified_by
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('driver_edit', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        });
    }
    deleteDriver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.driver_id == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3001, 'Invalid parameters - Driver');
                    return;
                }
                var params = {
                    driver_id: pRequest.body.driver_id
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('driver_delete', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 3000, "General error - Driver");
                }
            }
        });
    }
}
exports.DriverController = DriverController;
//# sourceMappingURL=driver.controller.js.map