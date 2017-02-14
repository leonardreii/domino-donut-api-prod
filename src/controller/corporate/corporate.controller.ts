import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { DataAccessService } from './../../services/data-access.service';
import { CorporateModel } from './../../model/corporate.model';

export class CorporateController{
    constructor(){
        Logging('Initialize Corporate Controller');
    }

    async test(pRequest:any, pResponse:any) {
        try {
            let vParam = {
                par1 : 'param1'
            };
            let payload = await DataAccessService.executeSP('get_car',undefined);

            pResponse.status(200).send(payload);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
            }
        }
    }

    async getCorporateList(pRequest: any, pResponse: any){
        try {
            var vCorporateName = (pRequest.body.corporatename == undefined) ? '' : pRequest.body.corporatename;
            var vLocation = (pRequest.body.location == undefined) ? '' : pRequest.body.location;
            var vEmail = (pRequest.body.email == undefined) ? '' : pRequest.body.email;
            var vPhoneNum = (pRequest.body.phone == undefined) ? '' : pRequest.body.phone;
            
            let vData = {
                pcorporatename : vCorporateName,
                plocation : vLocation,
                pemail : vEmail,
                pphonenumber : vPhoneNum
            };

            let payload = await DataAccessService.executeSP('corporate_get',vData);
            pResponse.status(200).send(payload);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
            }
        }
    }

    async addCorporate(pRequest: any, pResponse: any){
        try {
            if (pRequest.body.corporatename == undefined || pRequest.body.corporatename == '' ||
                pRequest.body.email == undefined || pRequest.body.email == '' ||
                pRequest.body.phone == undefined || pRequest.body.phone == '' ||
                pRequest.body.address == undefined || pRequest.body.address == '' ||
                pRequest.body.cityid == undefined || pRequest.body.cityid == '' ||
                pRequest.body.postalcode == undefined || pRequest.body.postalcode == '') {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 54001, 'Invalid parameters - Corporate');
                return;
            }
            var vCorporateName = pRequest.body.corporatename;
            var vEmail = pRequest.body.email;
            var vPhoneNum = pRequest.body.phone;
            var vAddress = pRequest.body.address;
            var vCityid = pRequest.body.cityid;
            var vPostalcode = pRequest.body.postalcode;

            let vData = {
                pcorporatename : vCorporateName,
                paddress : vAddress,
                ppostalcode : vPostalcode,
                pcityid : vCityid,
                pemail : vEmail,
                pphonenumber : vPhoneNum
            };

            let payload:any = await DataAccessService.executeSP('corporate_add',vData);
            pResponse.status(200).send(payload[0].result);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
            }
        }
    }

    async updateCorporate(pRequest: any, pResponse: any){
        try {
            Logging("Masuk ayam 1");
            if (pRequest.body.corporateid == undefined || pRequest.body.corporateid == '' ||
                pRequest.body.corporatename == undefined || pRequest.body.corporatename == '' ||
                pRequest.body.email == undefined || pRequest.body.email == '' ||
                pRequest.body.phone == undefined || pRequest.body.phone == '' ||
                pRequest.body.address == undefined || pRequest.body.address == '' ||
                pRequest.body.cityid == undefined || pRequest.body.cityid == '' ||
                pRequest.body.postalcode == undefined || pRequest.body.postalcode == '' ||
                pRequest.body.modifiedby == undefined || pRequest.body.modifiedby == '') {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 54001, 'Invalid parameters - Corporate');
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
                pcorporateid : vCorporateId,
                pcorporatename : vCorporateName,
                paddress : vAddress,
                ppostalcode : vPostalcode,
                pcityid : vCityid,
                pemail : vEmail,
                pphonenumber : vPhoneNum,
                pmodifiedby : vModifiedBy
            };

            let payload:any = await DataAccessService.executeSP('corporate_update',vData);
            pResponse.status(200).send(payload[0].result);
        }
        catch (err) {
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 4000, 'General error : ' + err);
            }
        }
    }
}