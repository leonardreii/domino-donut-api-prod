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

    public getDriverBody (p_driverId?:string, p_firstName?:string, p_lastName?:string, p_nik?:string,
    p_email?:string, p_phone?:string, p_location?:string, p_distance?:number, p_onlinestatus?:string) {
        let vData = {
            pdriverid: p_driverId,
            pfirstname: p_firstName,
            plastname: p_lastName,
            pnik: p_nik,
            pemail: p_email,
            pphone: p_phone,
            plocation: p_location,
            ponlinestatus: p_onlinestatus
        };
        return vData;  
    }
}