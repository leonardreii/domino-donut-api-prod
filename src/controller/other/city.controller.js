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
class OtherController {
    constructor() {
        logging_service_1.Logging('Initialize Other Controller');
    }
    getCityList(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = yield data_access_service_1.DataAccessService.executeSP('city_get', undefined);
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
}
exports.OtherController = OtherController;
//# sourceMappingURL=city.controller.js.map