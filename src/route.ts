import {Token} from './services/token.service';
import {LoginController} from './controller/login/login.controller';
export function Routing(router:any){
    const tokenService: Token = new Token();
    const loginController: LoginController = new LoginController();
    router.post('/login/authorization',loginController.authorize);
	}