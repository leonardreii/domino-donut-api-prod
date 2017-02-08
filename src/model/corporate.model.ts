export class CorporateModel{
    constructor(){
    }

    public getCorporateBody(p_corporateName:string, p_location:string, p_email:string, p_phone:string,p_address?:string, p_employeeQty?:number, p_corpHier?:number, p_corporateId?:string){
        let vData = {
            pcorporatename: p_corporateName,
            plocation: p_location,
            pemail: p_email,
            pphonenumber: p_phone,
            pemployeeqty: p_employeeQty,
            pcorphier: p_corpHier,
            paddress: p_address,
            pcorporateid: p_corporateId
        };
        return vData;
    }
}