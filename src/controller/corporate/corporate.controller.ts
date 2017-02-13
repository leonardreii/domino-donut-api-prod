import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { RedisService } from './../../services/redis.service';
import { DataAccessService } from './../../services/data-access.service';
import { CorporateModel } from './../../model/corporate.model';

export class CorporateController{
    constructor(){
        Logging('Initalize Corporate Controller');
    }

    async getCorporateListPaging(pRequest: any, pResponse: any){
        try {
            if (pRequest.body.page == undefined || pRequest.body.page == null ||
                pRequest.body.row == undefined || pRequest.body.row == null ||
                pRequest.body.sortby == undefined || pRequest.body.sortby == null ||
                pRequest.body.sorttype == undefined || pRequest.body.sorttype == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 4001, 'Invalid parameters - Corporate');
                return;
            }
            var vCorporateName = pRequest.body.corporatename;
            var vLocation = pRequest.body.location;
            var vEmail = pRequest.body.email;
            var vPhoneNum = pRequest.body.phone;
            
            let body = new CorporateModel();
            let vData:any = body.getCorporateBody(vCorporateName, vLocation, vEmail, vPhoneNum);
            
            vData['ppage'] = pRequest.body.page;
            vData['prow'] = pRequest.body.row;
            vData['psortby'] = pRequest.body.sortby;
            vData['psorttype'] = pRequest.body.sorttype;

            let payload = await DataAccessService.executeSP('get_corporatelistpaging',vData);
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
            if (pRequest.body.corporatename == undefined || pRequest.body.corporatename == null ||
                pRequest.body.location == undefined || pRequest.body.location == null ||
                pRequest.body.email == undefined || pRequest.body.email == null ||
                pRequest.body.phone == undefined || pRequest.body.phone == null ||
                pRequest.body.employeeqty == undefined || pRequest.body.employeeqty == null ||
                pRequest.body.corpHier == undefined || pRequest.body.corpHier == null ||
                pRequest.body.address == undefined || pRequest.body.address == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 4001, 'Invalid parameters - Corporate');
                return;
            }
            var vCorporateName = pRequest.body.corporatename;
            var vLocation = pRequest.body.location;
            var vEmail = pRequest.body.email;
            var vPhoneNum = pRequest.body.phone;
            var vEmployeeQty = pRequest.body.employeeqty;
            var vCorpHier = pRequest.body.corpHier;
            var vAddress = pRequest.body.address;

            let vData = new CorporateModel().getCorporateBody(vCorporateName, vLocation, vEmail, vPhoneNum, vAddress, vEmployeeQty, vCorpHier);

            let payload = await DataAccessService.executeSP('add_corporate',vData);
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

    async updateCorporate(pRequest: any, pResponse: any){
        try {
            Logging("Masuk ayam 1");
            if (pRequest.body.corporateid == undefined || pRequest.body.corporateid == null ||
                pRequest.body.corporatename == undefined || pRequest.body.corporatename == null ||
                pRequest.body.location == undefined || pRequest.body.location == null ||
                pRequest.body.email == undefined || pRequest.body.email == null ||
                pRequest.body.phone == undefined || pRequest.body.phone == null ||
                pRequest.body.employeeqty == undefined || pRequest.body.employeeqty == null ||
                pRequest.body.corpHier == undefined || pRequest.body.corpHier == null ||
                pRequest.body.address == undefined || pRequest.body.address == null) {
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 4001, 'Invalid parameters - Corporate');
                return;
            }
            var vCorporateId = pRequest.body.corporateid;
            var vCorporateName = pRequest.body.corporatename;
            var vLocation = pRequest.body.location;
            var vEmail = pRequest.body.email;
            var vPhoneNum = pRequest.body.phone;
            var vEmployeeQty = pRequest.body.employeeqty;
            var vCorpHier = pRequest.body.corpHier;
            var vAddress = pRequest.body.address;

            let vData = new CorporateModel().getCorporateBody(vCorporateName, vLocation, vEmail, vPhoneNum, vAddress, vEmployeeQty, vCorpHier, vCorporateId);
            Logging("vData : " + JSON.stringify(vData));

            let payload = await DataAccessService.executeSP('update_corporate',vData);
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
}