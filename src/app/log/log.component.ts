import { Component } from '@angular/core';
import { LogService } from './log.service';
import { User } from '../classes/user';

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
    errorMessage = 'default error';

    constructor(private _logService: LogService) {}

/*
    check () {
        this._logService.getUsers()
            .subscribe(
                users => this.users = users,
                err => this.errorMessage = <any>err);
        
        if ( this.users.find(()=>this.loginInput = ))

        if (this.loginInput === this.admin
            && this.loginInput === this.admin) {
                alert('zalogowany');
        }
        else {
            alert('bledne haslo');
        }
    }
    */
}
