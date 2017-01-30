import {Token} from './services/token.service';

import { DriverController } from './controller/driver/driver.controller';
import { CustomerController } from './controller/customer/customer.controller';

export function Routing(router){
    const tokenService: Token = new Token();

    const driverController:DriverController = new DriverController();
    router.post('/driver/registerdriver',driverController.updateDriver);

    const customerController:CustomerController = new CustomerController();
    router.post('/customer/finddriver',customerController.findDriver);
    router.post('/customer/estimatetrip',customerController.estimateTrip);
}