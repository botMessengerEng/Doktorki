import { Component } from '@angular/core';
import { User } from '../classes/user';
import { LogService } from "./log.service";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Component({
    selector:       'app-log',
    templateUrl:    'log.component.html',
    styleUrls:     ['log.component.css']
})


export class LogComponent {
    loginInput: string;
    passwordInput: string;
    admin: string = 'admin';
    users: User[];
    resMessage: string;
    private _server = '/log';

    constructor(private _logService: LogService) {}
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
