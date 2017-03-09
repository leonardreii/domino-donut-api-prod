"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppsUserModel {
    constructor(pid, plat, plng) {
        if (pid)
            this.setID(pid);
        else
            this.id = '';
        if (plat)
            this.setLat(plat);
        else
            this.lat = 0;
        if (plng)
            this.setLng(plng);
        else
            this.lng = 0;
    }
    setID(pid) {
        this.id = pid;
    }
    setLat(plat) {
        this.lat = plat;
    }
    setLng(plng) {
        this.lng = plng;
    }
    getID() {
        return this.id;
    }
    getLat() {
        return this.lat;
    }
    getLng() {
        return this.lng;
    }
}
exports.AppsUserModel = AppsUserModel;
//# sourceMappingURL=appsuser.model.js.map