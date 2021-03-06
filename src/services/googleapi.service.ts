import { Logging } from './logging.service';
import { ErrorHandlingService } from './error-handling.service';

var request = require('request');

export class GoogleAPIService{
    constructor(){
    }

    public static getTripEstimation(pResponse:any, platfrom:any, plngfrom:any, platto:any, plngto:any, punits:any){
        try{
            var link = "https://maps.googleapis.com/maps/api/distancematrix/json?";
            link +="key=AIzaSyCaRXsdUpgSOffOmuLRiV73OruPL347Bc4";
            link += "&units="+punits;
            link+="&origins="+platfrom+","+plngfrom;
            link+="&destinations="+platto+","+plngto;
            Logging('Making request to: '+link);
            request(link, async function (error:any, response:any, body:any) {
                body = JSON.parse(body);
                if(!body.rows[0].elements[0].distance){
                    ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 7001, "Location is not supported");
                }
                var distance = body.rows[0].elements[0].distance.value;
                var duration = body.rows[0].elements[0].duration.value;
                var tripEstimation={
                    distance: Math.ceil(distance/1000),
                    units: punits,
                    hours: Math.floor(duration/3600),
                    minutes: Math.ceil((duration%3600)/60),
                    price: punits=='matrix' ? Math.ceil(distance/1000)*3000 : Math.ceil((distance*0.3048)/1000)*3000
                };
                pResponse.status(200).json({result:tripEstimation});
            });
        }
        catch(err){
            Logging(err);
            throw 503;
        }
    }
}