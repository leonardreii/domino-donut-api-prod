import {Token} from './services/token.service';

import { DriverController } from './controller/driver/driver.controller';
import { CustomerController } from './controller/customer/customer.controller';
import { LoginController } from './controller/login/login.controller';

export function Routing(router){
    const tokenService: Token = new Token();

    const driverController:DriverController = new DriverController();
    router.post('/driver/updatedriver',driverController.updateDriver);

    const customerController:CustomerController = new CustomerController();
    router.post('/customer/finddriver',customerController.findDriver);
    router.post('/customer/estimatetrip',customerController.estimateTrip);

    const loginController:LoginController = new LoginController();
    router.post('/login/authorization',loginController.authorize); 


}