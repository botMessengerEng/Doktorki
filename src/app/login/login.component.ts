import { Component, OnInit } from '@angular/core';
import { User, Role } from '../classes/user';
import { LoginService } from './login.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})



export class LoginComponent implements OnInit {

    loginInput: string;
    passwordInput: string;
    admin: string = 'admin';
    users: User[];
    resMessage: any;
    invalid: boolean;
    loginForm: FormGroup;


    constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) { }


    ngOnInit(): void {
        this.loginForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


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

    redirectAfterLogin() {
        if (this.resMessage.role === 'admin') {
            this.router.navigate(['/admin/manage/doctors']);
        }
        else if (this.resMessage.role === 'doctor') {
            this.router.navigate(['/doctor', this.resMessage.login]);
        }
        else if (this.resMessage.role === 'patient') {
            this.router.navigate(['/patient', this.resMessage.login]);
        }
        else {
            this.invalid = true;
        }
    }

    onSubmit() {
        this.check()
            .then(() => setTimeout(() => {
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

