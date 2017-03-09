"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handling_service_1 = require("./error-handling.service");
const sequelize_service_1 = require("./sequelize.service");
const utility_1 = require("../shared/utility");
const logging_service_1 = require("./logging.service");
class DataAccessService {
    constructor() {
        logging_service_1.Logging('Initialize data access service');
    }
    static executeSP(pSPName, pParams) {
        logging_service_1.Logging('Executing sp : ' + pSPName);
        return new Promise(function (pResolve, pReject) {
            try {
                logging_service_1.Logging('Parsing the data');
                let vParams = '';
                let length;
                let counter;
                if (pParams) {
                    counter = 0;
                    length = Object.keys(pParams).length;
                    for (let vParam in pParams) {
                        ++counter;
                        if (pParams[vParam] !== undefined && pParams[vParam] !== null && typeof pParams[vParam] === 'string' && pParams[vParam].indexOf('\'') !== -1) {
                            pParams[vParam] = utility_1.Utility.replaceAll(pParams[vParam], '\'', '\'\'');
                        }
                        vParams += `@${vParam}='` + pParams[vParam] + "'";
                        if (counter != length)
                            vParams += ',';
                    }
                }
                let vSQL = `EXEC ${pSPName} ${vParams}`;
                logging_service_1.Logging('vSQL : ' + vSQL);
                sequelize_service_1.SequelizeService.sequelize.query(vSQL, { type: sequelize_service_1.SequelizeService.sequelize.QueryTypes.SELECT }).then(function (pResult) {
                    let vResult = pResult;
                    logging_service_1.Logging('Result: ' + vResult);
                    if (vResult.length == 1 &&
                        ('ErrorNumber' in vResult[0]) &&
                        ('ErrorMessage' in vResult[0])) {
                        vResult = vResult[0];
                        logging_service_1.Logging('Error while executing query : ' + vSQL);
                        error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, vResult.ErrorNumber, vResult.ErrorMessage);
                    }
                    else {
                        logging_service_1.Logging("success : ");
                        logging_service_1.Logging(vResult);
                        pResolve(vResult);
                    }
                }).catch(function (pErr) {
                    logging_service_1.Logging('Error while executing query : ' + vSQL);
                    // throwing error from the sequelize
                    logging_service_1.Logging('Error ' + pErr);
                    error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 400, pErr);
                });
            }
            catch (pErr) {
                logging_service_1.Logging(pErr);
                error_handling_service_1.ErrorHandlingService.throwPromiseError(pReject, 400, pErr);
            }
        });
    }
}
exports.DataAccessService = DataAccessService;
//# sourceMappingURL=data-access.service.js.map