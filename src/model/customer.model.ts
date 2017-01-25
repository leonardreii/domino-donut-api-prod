import { AppsUserModel } from './appsuser.model';

export class CustomerModel extends AppsUserModel{
    constructor(pid?, plat?, plng?){
        super(pid, plat, plng);
    }
}