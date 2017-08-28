import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'app/app.service';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class MenuService {

    menuContext = []
    menuLinks = []

    constructor(private appService: AppService, private authService: AuthService, private router: Router) {
    //    try {
    //        if (authService.user.role == "admin") {
                this.menuContext = [" ", " ", "USER'S LIST", "ADD USER", "LOG OUT"]
                this.menuLinks = [" ", " ", "/admin/users-list", "/admin/add-user", "/login"]
        //     }
        //     else if (authService.user.role == "doctor") {
        //         this.menuContext = [" ", " ", "USER'S LIST", "ADD PATIENT", "LOG OUT"]
        //     }
        //     else if (authService.user.role == "patient") {
        //         this.menuContext = [" ", "MY APPOINTMENTS", "NEW APPOINTMENTS", "MY PROFILE", "LOG OUT"]
        //         this.menuLinks = [" ",  "/my-appointments", "/new-appointment", "profile", "/login"]

        //     }
        // }
        // catch (err) {
        //     this.router.navigate(['login']);
        // }
    }
}   