import {ErrorHandlingService} from '../../services/error-handling.service';
import {Logging} from '../../services/logging.service';
import {DataAccessService} from '../../services/data-access.service';
import {TokenModel} from '../../model/token.model';
import {Token} from '../../services/token.service';
import {RedisService} from '../../services/redis.service';
var vEnv = require('../../config/mode.json')['mode'];
var vConfig = require('../../config/config.json')[vEnv];

export interface LoginControllerInterface {
    getTelenorURI(pRequest: any, pResponse: any): Promise<void>;
    authorize(pRequest: any, pResponse: any): Promise<void>;
}
export class LoginController implements LoginControllerInterface {
    constructor() {
        Logging('initialize Login controller');
    }

    async getTelenorURI(pRequest: any, pResponse: any): Promise<void> {
        try {
            Logging('calling telenorURI controller');
            let URI = Telenor.getTelenorURIAuthorize();
            pResponse.status(200).send({ 'telenorURI': URI });
        }
        catch (err) {
            Logging(err);
            if (err.code){
                WLog.writeErrorToDB(null,null,null,'LOGIN',err.code,err.desc);
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                WLog.writeErrorToDB(null,null,null,'LOGIN','1005','General error : '+err);
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1005, err);
            }
        }
    }
    async authorize(pRequest: any, pResponse: any): Promise<void> {
        Logging('calling authorize controller');
        try {
            if (pRequest.body.Code == undefined) {
                WLog.writeErrorToDB(null,null,null,'LOGIN','1001','Invalid login parameters');
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1001, 'Invalid Parameters');
                return;
            }
            let code = pRequest.body.Code;
            let token: any = await LoginController.telenorService.getAccessToken(code);
            Logging('token : ' + JSON.stringify(token));
            let userInfo: any = await LoginController.telenorService.getUserInfo(token.access_token, token.token_type);
            let vData = { pPhoneNumber: userInfo.phone_number, pEmail: userInfo.email };
            let mapVal: any = await DataAccessService.executeSP('mapTelenorData', vData, true);
            if (mapVal) {
                mapVal = mapVal[0];
                if(mapVal.login_status.toLowerCase() == 'active'){
                    WLog.logger.info('LOGIN|Login to EAP|%s|%s|%s|%s|%s|%s|%s|%s',mapVal.customer_id,
                    mapVal.msisdn,mapVal.name,'NULL',mapVal.brn_num,'NULL','NULL','NULL');
                    let tokenObj: TokenModel = new TokenModel();
                    tokenObj.setPhoneNumber(mapVal.msisdn);
                    tokenObj.setCompanyNo(mapVal.corp_acc_code);
                    tokenObj.setTelenorToken(token.access_token);
                    tokenObj.setBRN(mapVal.brn_num);
                    tokenObj.setCustID(mapVal.customer_id);
                    tokenObj.setIdType(mapVal.id_type);
                    tokenObj.setemailForLogin(userInfo.email);
                    let td_sls:any = Token.decryptBody(token.id_token);
                    td_sls = JSON.parse(td_sls).td_sls;
                    tokenObj.setTDSLS(td_sls);
                    if(!td_sls){
                        var now = new Date();
                        now.setMonth(now.getMonth()+6);
                        tokenObj.setLoginExpiredDate(now.getTime());
                    }
                    pResponse.header('accessToken', Token.encryptToken(tokenObj));
                    pResponse.header('created', Date.now());
                    mapVal['td_sls'] = td_sls;
                    pResponse.status(200).json({ "result": mapVal });
                }else if(mapVal.login_status.toLowerCase() == 'suspended'){
                    WLog.writeErrorToDB(null,userInfo.phone_number,JSON.stringify(vData),'LOGIN','1004','Suspended account');
                    var errorObj:any = ErrorHandlingService.buildErrorObject(1004,'Suspended account');
                    errorObj.phone = userInfo.phone_number;
                    errorObj.email = userInfo.email;
                    pResponse.status(401).json(errorObj);
                }
            }
            else {
                WLog.writeErrorToDB(null,userInfo.phone_number,JSON.stringify(vData),'LOGIN','1002','User is not registered yet');
                var errorObj:any = ErrorHandlingService.buildErrorObject(1002,'User is not registered yet');
                errorObj.phone = userInfo.phone_number;
                errorObj.email = userInfo.email;
                pResponse.status(401).json(errorObj);
            }
        }
        catch (err) {
            Logging(err);
            if (err.code){
                WLog.writeErrorToDB(null,null,null,'LOGIN',err.code,err.desc);
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                WLog.writeErrorToDB(null,null,null,'LOGIN','1005','General error : '+err);
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1003, err);
            }
        }
    }
}