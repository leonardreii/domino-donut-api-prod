import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { DataAccessService } from './../../services/data-access.service';

var request = require('request');

export class UserController{
    constructor(){
        Logging('Initalize Customer Controller');
    }

    async getUser(pRequest:any, pResponse:any){
        try{
            var params={
                username: pRequest.body.username==undefined? '' : pRequest.body.username,
                role_id: pRequest.body.roleid==undefined? '' : pRequest.boody.roledy
            };
            let result = await DataAccessService.executeSP('user_get',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
        }
    }

    async addUser(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.username==undefined||pRequest.body.password==undefined||
                pRequest.body.role_id==undefined||pRequest.body.created_by==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5001, "Invalid parameters - User");
                return;
            }
            var params={
                username: pRequest.body.username,
                password: pRequest.body.password,
                role_id: pRequest.body.role_id,
                created_by: pRequest.body.created_by
            };
            let result:any = await DataAccessService.executeSP('user_add',params);
            pResponse.status(200).json(result[0].result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
            }
        }
    }

    async editUser(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.user_id==undefined||
                pRequest.body.username==undefined||pRequest.body.password==undefined||
                pRequest.body.role_id==undefined||pRequest.body.last_modified_by==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5001, "Invalid parameters - User");
                return;
            }
            var params={
                user_id: pRequest.body.user_id,
                username: pRequest.body.username,
                password: pRequest.body.password,
                role_id: pRequest.body.role_id,
                last_modified_by: pRequest.body.last_modified_by
            };
            let result:any = await DataAccessService.executeSP('user_edit',params);
            pResponse.status(200).json(result[0].result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
            }
        }
    }

    async deleteuser(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.user_id==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5001, "Invalid parameters - User");
                return;
            }
            var params={
                user_id: pRequest.body.user_id
            }
            let result:any = await DataAccessService.executeSP('user_delete',params);
            pResponse.status(200).json(result[0].result);
        }
        catch(err){
            if (err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 5000, "General error - User");
            }
        }
    }
}