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
var request = require('request');
class UserController {
    constructor() {
        logging_service_1.Logging('Initalize Customer Controller');
    }
    getUser(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var params = {
                    first_name: pRequest.body.first_name == undefined ? '' : pRequest.body.first_name,
                    last_name: pRequest.body.last_name == undefined ? '' : pRequest.body.last_name,
                    email: pRequest.body.email == undefined ? '' : pRequest.body.email,
                    role_id: pRequest.body.role_id == undefined ? '' : pRequest.body.role_id
                };
                logging_service_1.Logging('aaa');
                let result = yield data_access_service_1.DataAccessService.executeSP('user_get', params);
                pResponse.status(200).json(result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
                }
            }
        });
    }
    addUser(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.first_name == undefined || pRequest.body.last_name == undefined ||
                    pRequest.body.email == undefined || pRequest.body.password == undefined ||
                    pRequest.body.role_id == undefined || pRequest.body.created_by == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5001, "Invalid parameters - User");
                    return;
                }
                var params = {
                    first_name: pRequest.body.first_name,
                    last_name: pRequest.body.last_name,
                    email: pRequest.body.email,
                    password: pRequest.body.password,
                    role_id: pRequest.body.role_id,
                    created_by: pRequest.body.created_by
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('user_add', params);
                pResponse.status(200).json(result[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
                }
            }
        });
    }
    editUser(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.user_id == undefined ||
                    pRequest.body.first_name == undefined || pRequest.body.last_name == undefined ||
                    pRequest.body.email == undefined || pRequest.body.password == undefined ||
                    pRequest.body.role_id == undefined || pRequest.body.last_modified_by == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5001, "Invalid parameters - User");
                    return;
                }
                var params = {
                    user_id: pRequest.body.user_id,
                    first_name: pRequest.body.first_name,
                    last_name: pRequest.body.last_name,
                    email: pRequest.body.email,
                    password: pRequest.body.password,
                    role_id: pRequest.body.role_id,
                    last_modified_by: pRequest.body.last_modified_by
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('user_edit', params);
                pResponse.status(200).json(result[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
                }
            }
        });
    }
    deleteuser(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.user_id == undefined) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5001, "Invalid parameters - User");
                    return;
                }
                var params = {
                    user_id: pRequest.body.user_id
                };
                let result = yield data_access_service_1.DataAccessService.executeSP('user_delete', params);
                pResponse.status(200).json(result[0].result);
            }
            catch (err) {
                if (err.code) {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
                }
                else {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map