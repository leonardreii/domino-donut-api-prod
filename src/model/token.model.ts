export class TokenModel{
    private id: string;

    constructor(){
        this.id="";
    }
    setId(id:string){
        this.id = id;
    }
    getId(){
        return this.id;
    }
}