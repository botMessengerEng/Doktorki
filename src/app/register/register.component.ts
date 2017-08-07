import { Component } from '@angular/core';

import { AppService } from 'app/app.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    errMessage: any;
    constructor(private appService: AppService, private router: Router) { }

    onSubmit(user) {
        this.appService.addNewUser(user)
        .subscribe((result) => {
            if (result === 'OK')
                this.back();
            else
                alert('login zajety');
        } 
    , err => this.errMessage = err )
    }

     back() {
        this.router.navigate(['login']);
    }
}
