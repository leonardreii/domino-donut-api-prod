import { AppsUserModel } from './appsuser.model';

export class DriverModel extends AppsUserModel{
    private status:string;
    constructor(pid?:string, plat?:any, plng?:any, pstatus?:string){
        super(pid, plat, plng);
        this.setStatus(pstatus);
    }

    public setStatus(pstatus:string){
        this.status = pstatus;
    }
    public getStatus(){
        return this.status;
    }
}