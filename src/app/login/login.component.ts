import { Component } from '@angular/core';
import { User } from '../classes/user';
import { LoginService } from './login.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';


@Component({
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
    private router: Router;

    constructor(private _logService: LoginService) {}
    check(): Promise<boolean> {
        this._logService.postQuery({
            login: 'admin'
        })
        .subscribe(
                res => this.resMessage = res); // powinno dzialac

         return new Promise(resolve => {
                    resolve(true)
                });
    }

    redirectAfterLogin () {
            if (this.resMessage == 'zalogowany'){
                this.router.navigateByUrl('/errorPage');
            }
            else {
                alert('coTyChceszZłodziejuNiedobry');
            }
    }

    login() {
        this.check()
            .then(() => this.redirectAfterLogin()
            );
    }



    refresh() {
        console.log(this.resMessage);
    }
}
