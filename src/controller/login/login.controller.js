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
const error_handling_service_1 = require("../../services/error-handling.service");
const logging_service_1 = require("../../services/logging.service");
const data_access_service_1 = require("../../services/data-access.service");
const token_model_1 = require("../../model/token.model");
const token_service_1 = require("../../services/token.service");
const websocket_service_1 = require("../../services/websocket.service");
var vEnv = require('../../config/mode.json')['mode'];
var vConfig = require('../../config/config.json')[vEnv];
class LoginController {
    constructor() {
        logging_service_1.Logging('initialize Login controller');
    }
    authorize_web(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging('calling authorize controller');
            try {
                let vParam = pRequest.body;
                let vResult;
                let vToken;
                if (vParam.email == undefined || vParam.email == null || vParam.email == "" ||
                    vParam.password == undefined || vParam.password == null || vParam.password == "") {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1001, 'Invalid Login Parameters');
                    return;
                }
                vResult = yield data_access_service_1.DataAccessService.executeSP('login_web', vParam);
                if (vResult.length == 0) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1002, 'Invalid username or password');
                    return;
                }
                else {
                    vResult = vResult[0];
                    vToken = new token_model_1.TokenModel();
                    vToken.setId(vResult.USER_ID);
                    pResponse.header('accessToken', token_service_1.Token.encryptToken(vToken));
                    pResponse.header('created', Date.now());
                    pResponse.status(200).json(vResult);
                }
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code)
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                else
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1000, err);
            }
        });
    }
    authorize_driver(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging('calling authorize controller');
            try {
                let vParam = pRequest.body;
                let vResult;
                let vToken;
                if (vParam.email == undefined || vParam.email == null || vParam.email == "" ||
                    vParam.password == undefined || vParam.password == null || vParam.password == "") {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1001, 'Invalid Login Parameters');
                    return;
                }
                vResult = yield data_access_service_1.DataAccessService.executeSP('login_driver', vParam);
                if (vResult.length == 0) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1002, 'Invalid username or password');
                    return;
                }
                else {
                    vResult = vResult[0];
                    vToken = new token_model_1.TokenModel();
                    vToken.setId(vResult.DRIVER_ID);
                    pResponse.header('accessToken', token_service_1.Token.encryptToken(vToken));
                    pResponse.header('created', Date.now());
                    pResponse.status(200).json(vResult);
                }
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code)
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                else
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1000, err);
            }
        });
    }
    authorize_employee(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_service_1.Logging('calling authorize controller : ' + websocket_service_1.WebSocketService.sockets.what);
            try {
                let vParam = pRequest.body;
                let vResult;
                let vToken;
                if (vParam.email == undefined || vParam.email == null || vParam.email == "" ||
                    vParam.password == undefined || vParam.password == null || vParam.password == "") {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1001, 'Invalid Login Parameters');
                    return;
                }
                vResult = yield data_access_service_1.DataAccessService.executeSP('login_employee', vParam);
                if (vResult.length == 0) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1002, 'Invalid username or password');
                    return;
                }
                else {
                    vResult = vResult[0];
                    vToken = new token_model_1.TokenModel();
                    vToken.setId(vResult.EMPLOYEE_ID);
                    pResponse.header('accessToken', token_service_1.Token.encryptToken(vToken));
                    pResponse.header('created', Date.now());
                    pResponse.status(200).json(vResult);
                }
            }
            catch (err) {
                logging_service_1.Logging(err);
                if (err.code)
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                else
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1000, err);
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map