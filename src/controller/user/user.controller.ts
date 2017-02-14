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
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 6002, "Error in retreiving user data");
        }
    }

    async addUser(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.username==undefined||pRequest.body.password==undefined||
                pRequest.body.role_id==undefined||pRequest.body.created_by==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 6001, "Invalid parameters - User");
            }
            var params={
                username: pRequest.body.username,
                password: pRequest.body.password,
                role_id: pRequest.body.role_id,
                created_by: pRequest.body.created_by
            };
            let result = await DataAccessService.executeSP('user_add',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 6003, "Error in adding user data");
        }
    }

    async editUser(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.user_id==undefined||
                pRequest.body.username==undefined||pRequest.body.password==undefined||
                pRequest.body.role_id==undefined||pRequest.body.last_modified_by==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 6001, "Invalid parameters - User");
            }
            var params={
                user_id: pRequest.body.user_id,
                username: pRequest.body.username,
                password: pRequest.body.password,
                role_id: pRequest.body.role_id,
                last_modified_by: pRequest.body.last_modified_by
            };
            let result = await DataAccessService.executeSP('user_edit',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 6004, "Error in editing user data");
        }
    }

    async deleteuser(pRequest:any, pResponse:any){
        try{
            if(pRequest.body.user_id==undefined){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 400, 6001, "Invalid parameters - User");
            }
            var params={
                user_id: pRequest.body.user_id
            }
            let result = await DataAccessService.executeSP('user_delete',params);
            pResponse.status(200).json(result);
        }
        catch(err){
            ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 6005, "Error in deleting user data");
        }
    }
}