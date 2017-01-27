export class TokenModel{
    private userId: string;

    constructor(){
        this.userId="";
    }
    setUserId(userId:string){
        this.userId = userId;
    }
    getUserId(){
        return this.userId;
    }
}