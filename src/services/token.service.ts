import {TokenModel} from '../model/token.model';
import {ErrorHandlingService} from './error-handling.service';
import {Logging} from './logging.service'
import {DataAccessService} from './data-access.service';
var vEnv = require('../config/mode.json')['mode'];
var vConfig = require('../config/config.json')[vEnv];
var vNJwt = require('njwt');
var CryptoJS = require('crypto-js');

export class Token  {
	static vTimeout = 60 * 60 * 1000;//60 minutes
	constructor(){
			Logging('initialize token service');
	}
	static encryptToken(pObject: TokenModel): string{
		try{
			// load sign in key from config files
			let vSigningkey = vConfig.token.key;
			// encrypt token
			let vJwt = vNJwt.create(pObject,vSigningkey);
			// set expiration for token
			Logging('td_sls enc : ' +pObject.getTDSLS());
			if(pObject.getTDSLS() == false)//Stay signed in
				vJwt.setExpiration();
			else
				vJwt.setExpiration(new Date().getTime() + this.vTimeout);
			let vToken = vJwt.compact();
			return vToken;
		}catch(pErr) {
			ErrorHandlingService.throwError(300, pErr.toString());
		}
	}
	static decryptToken(pToken:string): TokenModel{
		try{
			// load sign in key from config files
			let vSigningkey = vConfig.token.key;
			let vVerifiedJwt = vNJwt.verify(pToken,vSigningkey).body;
			let vTokenObject = new TokenModel();
			vTokenObject.setCompanyNo(vVerifiedJwt.companyNo);
			vTokenObject.setPhoneNumber(vVerifiedJwt.phoneNumber);
			vTokenObject.setTelenorToken(vVerifiedJwt.telenorToken);
			vTokenObject.setBRN(vVerifiedJwt.brn);
			vTokenObject.setCustID(vVerifiedJwt.custID);
			vTokenObject.setIdType(vVerifiedJwt.idType);
			if(vVerifiedJwt.td_sls == false)
				vTokenObject.setTTL(null);
			else
				vTokenObject.setTTL(vVerifiedJwt.exp);
			vTokenObject.setTDSLS(vVerifiedJwt.td_sls);
			vTokenObject.setLoginExpiredDate(vVerifiedJwt.loginExpiredDate);
			vTokenObject.setemailForLogin(vVerifiedJwt.emailForLogin);
			return vTokenObject;
		}catch(pErr){
			ErrorHandlingService.throwError(300, 'Invalid Access Token');
		}
	}
	static decryptBody(pToken:string): string{
		try{
			var arr=pToken.split('.');
			var words = CryptoJS.enc.Base64.parse(arr[1]);
			var jsonString = CryptoJS.enc.Utf8.stringify(words);
			return jsonString;
		}catch(pErr){
			ErrorHandlingService.throwError(300, 'Invalid Telenor Access Token');
		}
	}
	async verifyToken(pRequest,pResponse,next){
		if(pRequest.method == 'OPTIONS') next();
		try{
			let vToken = pRequest.get('authorization').replace('Bearer ','');
			let vTokenObject: TokenModel = Token.decryptToken(vToken);
			pResponse.locals.token = vTokenObject;
			//check TD_SLS & SESSION FROM COOKIE
			let td_sls = vTokenObject.getTDSLS();
			let lastdate = vTokenObject.getLoginExpiredDate();
			let cookie = (pRequest.cookies.pSessionId == "true");
			let now = new Date().getTime();
			let higherthan6month = now >= lastdate;

			if(td_sls && !cookie){
				ErrorHandlingService.throwHTTPErrorResponse(pResponse,403,300, 'Expired Session');
				return;
			}
			else if(lastdate != 0 && higherthan6month){
				ErrorHandlingService.throwHTTPErrorResponse(pResponse,403,300, 'Expired Session');
				return;
			}

			//check mapping table update access
			if(!td_sls && !cookie && !higherthan6month){ 
				let vData = { pPhoneNumber: vTokenObject.getPhoneNumber(), pEmail: vTokenObject.getemailForLogin() };
				let mapVal: any = await DataAccessService.executeSP('mapTelenorData', vData, true);
				if (mapVal) {
					mapVal = mapVal[0];
					let tokenObj: TokenModel = new TokenModel();
					tokenObj.setCompanyNo(mapVal.corp_acc_code);
					tokenObj.setPhoneNumber(mapVal.msisdn);
					tokenObj.setTelenorToken(vTokenObject.getTelenorToken());
					tokenObj.setBRN(mapVal.brn_num);
					tokenObj.setCustID(mapVal.customer_id);
					tokenObj.setIdType(mapVal.id_type);
					tokenObj.setTTL(vTokenObject.getTTL());
					tokenObj.setTDSLS(vTokenObject.getTDSLS());
					//vTokenObject.setLoginExpiredDate(vTokenObject.getLoginExpiredDate());
					tokenObj.setemailForLogin(vTokenObject.getemailForLogin());
					vTokenObject = tokenObj;
				}
				else{
					ErrorHandlingService.throwHTTPErrorResponse(pResponse,403,300, 'User does not exist');
					return;
				}
			}
			// renew the accessToken every time user hit API
			let vNewAccessToken = Token.encryptToken(vTokenObject);
			pResponse.header('accessToken', vNewAccessToken);
			pResponse.header('created', Date.now());
			next();
		}catch(ex){
			ErrorHandlingService.throwHTTPErrorResponse(pResponse,403,300, 'Invalid Access Token');
		}
	}
}