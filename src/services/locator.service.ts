export class LocatorService{
    constructor(){}

    public static deg2rad(angle: number) {
        return angle * 0.017453292519943295;
    }
    public static countDistance(platfrom, plngfrom, platto, plngto) {
        let latFrom: number = this.deg2rad(platfrom);
        let longFrom: number = this.deg2rad(plngfrom);
        let latTo: number = this.deg2rad(platto);
        let longTo: number = this.deg2rad(plngto);

        let longDelta: number = longTo - longFrom;
        let a = Math.pow(Math.cos(latTo) * Math.sin(longDelta), 2) + Math.pow(Math.cos(latFrom) * Math.sin(latTo) - Math.sin(latFrom) * Math.cos(latTo) * Math.cos(longDelta), 2);
        let b = Math.sin(latFrom) * Math.sin(latTo) + Math.cos(latFrom) * Math.cos(latTo) * Math.cos(longDelta);
        
        let angle = Math.atan2(Math.sqrt(a), b);
        let jarak = angle * 6371000;
        let km = Math.ceil(jarak/1000);
        return km;
    }
}