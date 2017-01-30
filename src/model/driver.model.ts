import { AppsUserModel } from './appsuser.model';

export class DriverModel extends AppsUserModel{
    private status;
    constructor(pid?, plat?, plng?, pstatus?){
        super(pid, plat, plng);
        this.setStatus(pstatus);
    }

    public setStatus(pstatus){
        this.status = pstatus;
    }
    public getStatus(){
        return this.status;
    }
}