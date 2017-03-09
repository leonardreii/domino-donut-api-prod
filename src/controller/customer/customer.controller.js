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
const locator_service_1 = require("./../../services/locator.service");
const googleapi_service_1 = require("./../../services/googleapi.service");
const data_access_service_1 = require("./../../services/data-access.service");
const customer_model_1 = require("./../../model/customer.model");
const driver_model_1 = require("./../../model/driver.model");
const websocket_service_1 = require("./../../services/websocket.service");
var request = require('request');
var APIKEY = 'AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4';
class CustomerController {
    constructor() {
        logging_service_1.Logging('Initalize Customer Controller');
    }
    updateSocket(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vTokenObject = pResponse.locals.token;
                let vParam = pRequest.body;
                let vResult;
                if (vParam.socketid == undefined || vParam.socketid == null || vParam.socketid == "") {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 100, 'Invalid parameter');
                    return;
                }
                vParam.employee_id = vTokenObject.getId();
                vResult = yield data_access_service_1.DataAccessService.executeSP('update_socketid_employee', vParam);
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
    estimateTrip(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pRequest.body.latfrom == undefined || pRequest.body.lngfrom == undefined ||
                pRequest.body.latto == undefined || pRequest.body.lngto == undefined || pRequest.body.units == undefined) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
                return;
            }
            try {
                // response sent by the GoogleAPIService                       hereee
                var tripEstimation = yield googleapi_service_1.GoogleAPIService.getTripEstimation(pResponse, pRequest.body.latfrom, pRequest.body.lngfrom, pRequest.body.latto, pRequest.body.lngto, pRequest.body.units);
            }
            catch (err) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1000, "Error in estimating trip");
            }
        });
    }
    findDriver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pRequest.body.employee_id == undefined || pRequest.body.pickuploc == undefined ||
                pRequest.body.pickuplat == undefined || pRequest.body.pickuplng == undefined ||
                pRequest.body.destname == undefined || pRequest.body.destlat == undefined || pRequest.body.destlng == undefined) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
                return;
            }
            var customer = new customer_model_1.CustomerModel(pRequest.body.customerid, pRequest.body.pickuplat, pRequest.body.pickuplng);
            try {
                // insert the order with empty driver
                let vTokenObject = pResponse.locals.token;
                var orderData = {
                    employee_id: pRequest.body.employee_id,
                    pickup_location: pRequest.body.pickuploc,
                    pickup_lat: pRequest.body.pickuplat,
                    pickup_lng: pRequest.body.pickuplng,
                    destination_name: pRequest.body.destname,
                    destination_lat: pRequest.body.destlat,
                    destination_lng: pRequest.body.destlng
                };
                let orderResult = yield data_access_service_1.DataAccessService.executeSP('employee_makeorder', orderData);
                logging_service_1.Logging(JSON.stringify(orderResult));
                // find the driver
                var driverList = yield redis_service_1.RedisService.getActiveDriverList();
                var nearest = 999999;
                var chosenDriver;
                logging_service_1.Logging("Searching for driver..");
                for (let i in driverList) {
                    var driverloc = driverList[i];
                    var driverlat = driverloc.split(',')[0];
                    var driverlng = driverloc.split(',')[1];
                    var km = locator_service_1.LocatorService.countDistance(customer.getLat(), customer.getLng(), driverlat, driverlng);
                    // Logging("current distance: "+km+", nearest: "+nearest);
                    if (km < nearest) {
                        nearest = km;
                        chosenDriver = new driver_model_1.DriverModel(i, driverlat, driverlng);
                    }
                }
                if (nearest == 999999) {
                    var param = {
                        order_id: orderResult[0].order_id,
                        order_status: "NOTFOUND"
                    };
                    let result = yield data_access_service_1.DataAccessService.executeSP('order_updatestatus', param);
                    pResponse.status(200).json({ result: 'No driver available at this moment' });
                }
                else {
                    chosenDriver.setStatus("ongoing");
                    redis_service_1.RedisService.refreshDriverList(chosenDriver);
                    var params = {
                        driver_id: chosenDriver.getID()
                    };
                    let driverData = yield data_access_service_1.DataAccessService.executeSP('driver_getdetails', params);
                    if (driverData != null) {
                        var response = {
                            'driver_id': chosenDriver.getID(),
                            'name': driverData[0].first_name + ' ' + driverData[0].last_name,
                            'phone_number': driverData[0].phone_number,
                            'rating': driverData[0].rating,
                            'plate_no': driverData[0].plate_no,
                            'lat': chosenDriver.getLat(),
                            'lng': chosenDriver.getLng()
                        };
                        let driverParams = {
                            order_id: orderResult[0].order_id,
                            driver_id: chosenDriver.getID(),
                            plate_no: driverData[0].plate_no
                        };
                        let result = yield data_access_service_1.DataAccessService.executeSP('order_assign_driver', driverParams);
                        let vParams = {
                            employee_id: vTokenObject.getId()
                        };
                        result = yield data_access_service_1.DataAccessService.executeSP('employee_getdetails', vParams);
                        websocket_service_1.WebSocketService.sockets[driverData[0].socket_id].emit('incomingOrder', result[0]);
                        pResponse.status(200).json(response);
                    }
                    else {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 4002, "Driver id is not found in DB");
                    }
                }
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2000, "Error in finding driver");
                }
            }
        });
    }
    getEmployeeList(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var vEmployeeName = (pRequest.body.employeename == undefined) ? '' : pRequest.body.employeename;
                var vNIK = (pRequest.body.nik == undefined) ? '' : pRequest.body.nik;
                var vEmail = (pRequest.body.email == undefined) ? '' : pRequest.body.email;
                var vPhoneNum = (pRequest.body.phone == undefined) ? '' : pRequest.body.phone;
                var vCorporateName = (pRequest.body.corporatename == undefined) ? '' : pRequest.body.corporatename;
                let vData = {
                    pname: vEmployeeName,
                    pnik: vNIK,
                    pemail: vEmail,
                    pphonenumber: vPhoneNum,
                    pcorporatename: vCorporateName
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('employee_get', vData);
                pResponse.status(200).send(payload);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, 'General error : ' + err);
                }
            }
        });
    }
    getDetails(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.employee_id == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter - Customer");
                    return;
                }
                var params = {
                    employee_id: pRequest.body.employee_id
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('employee_getdetails', params);
                pResponse.status(200).json(result[0]);
            }
            catch (err) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2008, "Error in  retrieving details data");
            }
        });
    }
    getUser(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var params = {
                    username: pRequest.body.username,
                    role_id: pRequest.body.roleid
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('user_get', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2004, "Error in retreiving user data");
            }
        });
    }
    getHistory(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.employee_id == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 100, "Invalid Parameter");
                    return;
                }
                var params = {
                    employee_id: pRequest.body.employee_id
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('customer_history', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 2004, "Error in retreiving customer history");
            }
        });
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map