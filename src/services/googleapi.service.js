"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_service_1 = require("./logging.service");
const error_handling_service_1 = require("./error-handling.service");
var request = require('request');
class GoogleAPIService {
    constructor() {
    }
    static getTripEstimation(pResponse, platfrom, plngfrom, platto, plngto, punits) {
        try {
            var link = "https://maps.googleapis.com/maps/api/distancematrix/json?";
            link += "key=AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4";
            link += "&units=" + punits;
            link += "&origins=" + platfrom + "," + plngfrom;
            link += "&destinations=" + platto + "," + plngto;
            logging_service_1.Logging('Making request to: ' + link);
            request(link, function (error, response, body) {
                return __awaiter(this, void 0, void 0, function* () {
                    body = JSON.parse(body);
                    if (!body.rows[0].elements[0].distance) {
                        error_handling_service_1.ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 7001, "Location is not supported");
                    }
                    var distance = body.rows[0].elements[0].distance.value;
                    var duration = body.rows[0].elements[0].duration.value;
                    var tripEstimation = {
                        distance: Math.ceil(distance / 1000),
                        units: punits,
                        hours: Math.floor(duration / 3600),
                        minutes: Math.ceil((duration % 3600) / 60),
                        price: punits == 'matrix' ? Math.ceil(distance / 1000) * 3000 : Math.ceil((distance * 0.3048) / 1000) * 3000
                    };
                    pResponse.status(200).json({ result: tripEstimation });
                });
            });
        }
        catch (err) {
            logging_service_1.Logging(err);
            throw 503;
        }
    }
}
exports.GoogleAPIService = GoogleAPIService;
//# sourceMappingURL=googleapi.service.js.map