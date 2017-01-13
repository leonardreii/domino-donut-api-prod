export class TokenModel{
    private companyNo: string;
    private phoneNumber: string;
    private telenorToken: string;
    private brn: string;
    private custID: string;
    private idType: string;
    private ttl_token : string;
    private td_sls :boolean;
    private loginExpiredDate:number;
    private emailForLogin:string;

    constructor(){
        this.companyNo = '';
        this.phoneNumber = '';
        this.telenorToken = '';
        this.brn = '';
        this.custID = '';
        this.idType = '';
        this.ttl_token = '';
        this.td_sls = undefined;
        this.loginExpiredDate = 0;
        this.emailForLogin = '';
    }
    setemailForLogin(emailForLogin:string){
        this.emailForLogin = emailForLogin;
    }
    getemailForLogin(){
        return this.emailForLogin;
    }

    setLoginExpiredDate(loginExpiredDate:number){
        this.loginExpiredDate = loginExpiredDate;
    }
    getLoginExpiredDate(){
        return this.loginExpiredDate;
    }

    setTDSLS(td_sls:boolean){
        this.td_sls = td_sls;
    }
    getTDSLS(){
        return this.td_sls;
    }

    setTTL(ttl_token:string){
        this.ttl_token = ttl_token;
    }
    getTTL(){
        return this.ttl_token;
    }

    setIdType(idType:string){
        this.idType = idType;
    }
    getIdType(){
        return this.idType;
    }

    setCustID(custID:string){
        this.custID = custID;
    }
    getCustID(){
        return this.custID;
    }

    setBRN(brn:string){
        this.brn = brn;
    }
    getBRN(){
        return this.brn;
    }

    setTelenorToken(telenorToken:string){
        this.telenorToken = telenorToken;
    }
    getTelenorToken(){
        return this.telenorToken;
    }

    setPhoneNumber(phoneNumber:string){
        this.phoneNumber = phoneNumber;
    }
    getPhoneNumber(){
        return this.phoneNumber;
    }
    setCompanyNo(companyNo:string){
        this.companyNo = companyNo;
    }
    getCompanyNo(){
        return this.companyNo;
    }
}