"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocatorService {
    constructor() { }
    static deg2rad(angle) {
        return angle * 0.017453292519943295;
    }
    static countDistance(platfrom, plngfrom, platto, plngto) {
        let latFrom = this.deg2rad(platfrom);
        let longFrom = this.deg2rad(plngfrom);
        let latTo = this.deg2rad(platto);
        let longTo = this.deg2rad(plngto);
        let longDelta = longTo - longFrom;
        let a = Math.pow(Math.cos(latTo) * Math.sin(longDelta), 2) + Math.pow(Math.cos(latFrom) * Math.sin(latTo) - Math.sin(latFrom) * Math.cos(latTo) * Math.cos(longDelta), 2);
        let b = Math.sin(latFrom) * Math.sin(latTo) + Math.cos(latFrom) * Math.cos(latTo) * Math.cos(longDelta);
        let angle = Math.atan2(Math.sqrt(a), b);
        let jarak = angle * 6371000;
        let km = Math.ceil(jarak / 1000);
        return km;
    }
}
exports.LocatorService = LocatorService;
//# sourceMappingURL=locator.service.js.map