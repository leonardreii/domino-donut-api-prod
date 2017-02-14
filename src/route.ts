import { Token } from './services/token.service';
import { DriverController } from './controller/driver/driver.controller';
import { CustomerController } from './controller/customer/customer.controller';
import { OrderController } from './controller/order/order.controller';
import { CorporateController } from './controller/corporate/corporate.controller';
import { LoginController } from './controller/login/login.controller';
import { CarController } from './controller/car/car.controller'

export function Routing(router:any){
    const tokenService: Token = new Token();

    const driverController:DriverController = new DriverController();
    router.post('/driver/updatedriver',driverController.updateDriver);
    router.get('/driver/driverdetail/:driverid',driverController.getDriverDetails);
    router.post('/driver/getdriverlist',driverController.getDriverListPaging);

    const customerController:CustomerController = new CustomerController();
    router.post('/customer/finddriver',customerController.findDriver);
    router.post('/customer/estimatetrip',customerController.estimateTrip);

    const loginController:LoginController = new LoginController();
    router.post('/login/authorization',loginController.authorize); 

    const orderCtrl:OrderController = new OrderController();
    router.put('/order/cancelorder',orderCtrl.cancelOrder);

    const corporateCtrl:CorporateController = new CorporateController();
    router.get('/corporate/test',corporateCtrl.test);
    router.post('/corporate/getcorporatelist',corporateCtrl.getCorporateList);
    router.post('/corporate/corporate',corporateCtrl.addCorporate);
    router.put('/corporate/corporate',corporateCtrl.updateCorporate);

    const carCtrl:CarController = new CarController();
    router.post('/car/carlist',carCtrl.getCar);
}
