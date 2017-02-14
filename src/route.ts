import { Token } from './services/token.service';
import { DriverController } from './controller/driver/driver.controller';
import { CustomerController } from './controller/customer/customer.controller';
import { OrderController } from './controller/order/order.controller';
import { CorporateController } from './controller/corporate/corporate.controller';
import { UserController } from './controller/user/user.controller';
import { LoginController } from './controller/login/login.controller';

export function Routing(router:any){
    const tokenService: Token = new Token();

    const driverController:DriverController = new DriverController();
    router.post('/driver/updatedriver',driverController.updateDriver);
    router.get('/driver/driverdetail/:driverid',driverController.getDriverDetails);
    router.post('/driver/getdriverlist',driverController.getDriverListPaging);
    router.post('/driver/getdata',driverController.getData);
    router.post('/driver/add',driverController.addDriver);
    router.post('/driver/edit',driverController.editDriver);
    router.post('/driver/delete',driverController.deleteDriver);

    const customerController:CustomerController = new CustomerController();
    router.post('/customer/finddriver',customerController.findDriver);
    router.post('/customer/estimatetrip',customerController.estimateTrip);
    router.post('/customer/history',customerController.getHistory);

    const loginController:LoginController = new LoginController();
    router.post('/login/authorization',loginController.authorize); 

    const orderCtrl:OrderController = new OrderController();
    router.put('/order/orderstatus',orderCtrl.updateOrderStatus);

    const corporateCtrl:CorporateController = new CorporateController();
    router.post('/corporate/getcorporatelist',corporateCtrl.getCorporateListPaging);
    router.post('/corporate/corporate',corporateCtrl.addCorporate);
    router.put('/corporate/corporate',corporateCtrl.updateCorporate);

    const userCtrl:UserController = new UserController();
    router.post('/user/getdata',userCtrl.getUser);
    router.post('/user/add',userCtrl.addUser);
    router.post('/user/edit',userCtrl.editUser);
    router.post('/user/delete',userCtrl.deleteuser);
}
