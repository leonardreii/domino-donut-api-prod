import { AppsUserModel } from './appsuser.model';

export class CustomerModel extends AppsUserModel{
    constructor(pid?:any, plat?:any, plng?:any){
        super(pid, plat, plng);
    }
}