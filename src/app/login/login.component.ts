import { Component } from '@angular/core';
import { User } from '../classes/user';
import { LoginService } from './login.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Router,  } from '@angular/router';


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

    constructor(private loginService: LoginService, private router: Router) {}
    check(): Promise<boolean> {
        this.loginService.postQuery({
            login: this.loginInput,
            password: this.passwordInput
        })
        .subscribe(
                res => this.resMessage = res); // powinno dzialac

         return new Promise(resolve => {
                    resolve(true)
                });
    }

    redirectAfterLogin () {
            if (this.resMessage == 'admin'){
                this.router.navigate(['/admin']);
            }
            else {
                alert('coTyChceszZłodziejuNiedobry');
            }
    }

    login() {
        this.check()
            .then(() => setTimeout( () => {
                this.redirectAfterLogin();
                console.log('w lambdzie:  ' + this.resMessage);
            }, 300)
            );
        console.log('za lambda:  ' + this.resMessage);
    }



    refresh() {
        console.log(this.resMessage);
    }
}
