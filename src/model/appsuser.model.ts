export class AppsUserModel{
    private id;
    private lat;
    private lng;

    constructor(pid?, plat?, plng?){
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

    public setID(pid){
        this.id = pid;
    }
    public setLat(plat){
        this.lat = plat;
    }
    public setLng(plng){
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