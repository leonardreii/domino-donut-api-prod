import {ErrorHandlingService} from '../../services/error-handling.service';
import {Logging} from '../../services/logging.service';
import {DataAccessService} from '../../services/data-access.service';
import {TokenModel} from '../../model/token.model';
import {Token} from '../../services/token.service';
import {RedisService} from '../../services/redis.service';
declare var require:any;

var vEnv = require('../../config/mode.json')['mode'];
var vConfig = require('../../config/config.json')[vEnv];

export interface LoginControllerInterface {
    authorize(pRequest: any, pResponse: any): Promise<void>;
}
interface loginData{
    username:string;
    password:string;
}
export class LoginController implements LoginControllerInterface {
    constructor() {
        Logging('initialize Login controller');
    }
    async authorize(pRequest: any, pResponse: any): Promise<void> {
        Logging('calling authorize controller');
        try {
            let vParam:loginData = pRequest.body; 
            let vResult:any;
            let vToken:TokenModel;
            if (vParam.username == undefined || vParam.username == null || vParam.username == "" ||
               vParam.password == undefined || vParam.password == null || vParam.password == "") {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1001, 'Invalid Login Parameters');
                return;
            }
            vResult = await DataAccessService.executeSP('login', vParam);
            if(vResult.length == 0){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 1002, 'Invalid username or password');
                return;
            }
            else{
                vResult = vResult[0];
                vToken = new TokenModel();
                vToken.setUserId(vResult.user_id);
                pResponse.header('accessToken', Token.encryptToken(vToken));
                pResponse.header('created', Date.now());
                pResponse.status(200).send("Successfully login");
            }
        }
        catch (err) {
            Logging(err);
            if (err.code)
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            else
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 1000, err);
        }
    }
}