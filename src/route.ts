import { Token } from './services/token.service';
import { DriverController } from './controller/driver/driver.controller';
import { CustomerController } from './controller/customer/customer.controller';
import { OrderController } from './controller/order/order.controller';
import { CorporateController } from './controller/corporate/corporate.controller';
import { UserController } from './controller/user/user.controller';
import { CarController } from './controller/car/car.controller';
import { LoginController } from './controller/login/login.controller';


export function Routing(router:any){
    const tokenService: Token = new Token();

    const driverController:DriverController = new DriverController();
    router.post('/driver/updatedriver',driverController.updateDriver);
    router.put('/driver/socketid',tokenService.verifyToken,driverController.updateSocket);
    router.get('/driver/driverdetail/:driverid',driverController.getDriverDetails);
    router.post('/driver/getdriverlist',driverController.getDriverListPaging);
    router.post('/driver/getdata',driverController.getData);
    router.post('/driver/add',driverController.addDriver);
    router.post('/driver/edit',driverController.editDriver);
    router.post('/driver/delete',driverController.deleteDriver);

    const customerController:CustomerController = new CustomerController();
    router.put('/customer/socketid',tokenService.verifyToken,customerController.updateSocket);
    router.post('/customer/finddriver',customerController.findDriver);
    router.post('/customer/estimatetrip',customerController.estimateTrip);
    router.post('/customer/history',customerController.getHistory);
    router.post('/customer/getdetails',customerController.getDetails);

    const carController:CarController = new CarController();
    router.post('/car/add',carController.addCar);
    router.post('/car/edit',carController.editCar);
    router.post('/car/carlist',carController.getCar);
    router.post('/car/driverpairing',carController.pairCarDriver);

    const loginController:LoginController = new LoginController();
    router.post('/driver/login',loginController.authorize_driver);
    router.post('/customer/login',loginController.authorize_employee);
    router.post('/corporate/login',loginController.authorize_web); 

    const orderCtrl:OrderController = new OrderController();
    router.put('/order/cancelorder',orderCtrl.cancelOrder);
    router.put('/order/driverrating',orderCtrl.setDriverRating);

    const corporateCtrl:CorporateController = new CorporateController();
    router.post('/corporate/getcorporatelist',corporateCtrl.getCorporateList);
    router.get('/corporate/detail/:corporateid',corporateCtrl.getCorporateDetail);
    router.post('/corporate/corporate',corporateCtrl.addCorporate);
    router.put('/corporate/corporate',corporateCtrl.updateCorporate);
    
    const userCtrl:UserController = new UserController();
    router.post('/user/getdata',userCtrl.getUser);
    router.post('/user/add',userCtrl.addUser);
    router.post('/user/edit',userCtrl.editUser);
    router.post('/user/delete',userCtrl.deleteuser);
}
