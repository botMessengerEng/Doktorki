import { Component } from '@angular/core';
import { User } from '../classes/user';
import { LoginService } from './login.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Component({
    selector:       'app-log',
    templateUrl:    'login.component.html',
    styleUrls:     ['login.component.css']
})


export class LoginComponent {
    loginInput: string;
    passwordInput: string;
    admin: string = 'admin';
    users: User[];
    resMessage: string;
    private _server = '/log';

    constructor(private _logService: LoginService) {}
    check() {
    this._logService.postQuery({
        login: 'admin'
    })
            .subscribe(
                res => this.resMessage = res); // powinno dzialac
    }

    refresh() {
        console.log(this.resMessage);
    }
}
