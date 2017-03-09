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
class CorporateController {
    constructor() {
        logging_service_1.Logging('Initialize Corporate Controller');
    }
    getCorporateDetail(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.params.corporateid == undefined || pRequest.params.corporateid == '') {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 54001, 'Invalid parameters - Corporate');
                    return;
                }
                let vData = {
                    pcorporateid: pRequest.params.corporateid
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('corporate_getdetail', vData);
                pResponse.status(200).send(payload[0]);
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
    getCorporateList(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var vCorporateName = (pRequest.body.corporatename == undefined) ? '' : pRequest.body.corporatename;
                var vLocation = (pRequest.body.location == undefined) ? '' : pRequest.body.location;
                var vEmail = (pRequest.body.email == undefined) ? '' : pRequest.body.email;
                var vPhoneNum = (pRequest.body.phone == undefined) ? '' : pRequest.body.phone;
                let vData = {
                    pcorporatename: vCorporateName,
                    plocation: vLocation,
                    pemail: vEmail,
                    pphonenumber: vPhoneNum
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('corporate_get', vData);
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
    addCorporate(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (pRequest.body.corporatename == undefined || pRequest.body.corporatename == '' ||
                    pRequest.body.email == undefined || pRequest.body.email == '' ||
                    pRequest.body.phone == undefined || pRequest.body.phone == '' ||
                    pRequest.body.address == undefined || pRequest.body.address == '' ||
                    pRequest.body.cityid == undefined || pRequest.body.cityid == '' ||
                    pRequest.body.postalcode == undefined || pRequest.body.postalcode == '') {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 54001, 'Invalid parameters - Corporate');
                    return;
                }
                var vCorporateName = pRequest.body.corporatename;
                var vEmail = pRequest.body.email;
                var vPhoneNum = pRequest.body.phone;
                var vAddress = pRequest.body.address;
                var vCityid = pRequest.body.cityid;
                var vPostalcode = pRequest.body.postalcode;
                let vData = {
                    pcorporatename: vCorporateName,
                    paddress: vAddress,
                    ppostalcode: vPostalcode,
                    pcityid: vCityid,
                    pemail: vEmail,
                    pphonenumber: vPhoneNum
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('corporate_add', vData);
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
    updateCorporate(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logging_service_1.Logging("Masuk ayam 1");
                if (pRequest.body.corporateid == undefined || pRequest.body.corporateid == '' ||
                    pRequest.body.corporatename == undefined || pRequest.body.corporatename == '' ||
                    pRequest.body.email == undefined || pRequest.body.email == '' ||
                    pRequest.body.phone == undefined || pRequest.body.phone == '' ||
                    pRequest.body.address == undefined || pRequest.body.address == '' ||
                    pRequest.body.cityid == undefined || pRequest.body.cityid == '' ||
                    pRequest.body.postalcode == undefined || pRequest.body.postalcode == '' ||
                    pRequest.body.modifiedby == undefined || pRequest.body.modifiedby == '') {
                    error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 54001, 'Invalid parameters - Corporate');
                    return;
                }
                var vCorporateId = pRequest.body.corporateid;
                var vCorporateName = pRequest.body.corporatename;
                var vEmail = pRequest.body.email;
                var vPhoneNum = pRequest.body.phone;
                var vAddress = pRequest.body.address;
                var vCityid = pRequest.body.cityid;
                var vPostalcode = pRequest.body.postalcode;
                var vModifiedBy = pRequest.body.modifiedby;
                let vData = {
                    pcorporateid: vCorporateId,
                    pcorporatename: vCorporateName,
                    paddress: vAddress,
                    ppostalcode: vPostalcode,
                    pcityid: vCityid,
                    pemail: vEmail,
                    pphonenumber: vPhoneNum,
                    pmodifiedby: vModifiedBy
                };
                let payload = yield data_access_service_1.DataAccessService.executeSP('corporate_update', vData);
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
}
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map