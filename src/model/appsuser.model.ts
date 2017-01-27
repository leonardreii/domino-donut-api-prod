export class AppsUserModel{
    private id:any;
    private lat:any;
    private lng:any;

    constructor(pid?:any, plat?:any, plng?:any){
        if(pid)
            this.setID(pid);
        else
            this.id='';
        
        if(plat)
            this.setLat(plat);
        else
            this.lat=0;

        if(plng)
            this.setLng(plng);
        else
            this.lng=0;
    }

    public setID(pid:any){
        this.id = pid;
    }
    public setLat(plat:any){
        this.lat = plat;
    }
    public setLng(plng:any){
        this.lng=plng;
    }

    public getID(){
        return this.id;
    }
    public getLat(){
        return this.lat;
    }
    public getLng(){
        return this.lng;
    }
}