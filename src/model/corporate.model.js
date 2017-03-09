"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CorporateModel {
    constructor() {
    }
    getCorporateBody(p_corporateName, p_location, p_email, p_phone, p_address, p_employeeQty, p_corpHier, p_corporateId) {
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
exports.CorporateModel = CorporateModel;
//# sourceMappingURL=corporate.model.js.map