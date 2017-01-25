import { AppsUserModel } from './appsuser.model';

export class DriverModel extends AppsUserModel{
    constructor(pid?, plat?, plng?){
        super(pid, plat, plng);
    }
}