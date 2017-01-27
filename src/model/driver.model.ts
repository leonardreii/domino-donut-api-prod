import { AppsUserModel } from './appsuser.model';

export class DriverModel extends AppsUserModel{
    constructor(pid?:any, plat?:any, plng?:any){
        super(pid, plat, plng);
    }
}