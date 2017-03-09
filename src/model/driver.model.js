"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appsuser_model_1 = require("./appsuser.model");
class DriverModel extends appsuser_model_1.AppsUserModel {
    constructor(pid, plat, plng, pstatus) {
        super(pid, plat, plng);
        this.setStatus(pstatus);
    }
    setStatus(pstatus) {
        this.status = pstatus;
    }
    getStatus() {
        return this.status;
    }
    getDriverBody(p_driverId, p_firstName, p_lastName, p_nik, p_email, p_phone, p_location, p_distance, p_onlinestatus) {
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
exports.DriverModel = DriverModel;
//# sourceMappingURL=driver.model.js.map