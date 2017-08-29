import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'app/app.service';
import { AdminService } from 'app/admin/admin.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    errorMessage: any;
    users: any;
    url: string;
    selectedUser: any;
    doctorFilter: string = '';
    onlyDoctors= true;
    onlyPatients= true;
    userRole: string;

    constructor(private appService: AppService, private adminService: AdminService, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.getUsers();
        this.userRole=this.authService.user.role;
    }

    getUsers() {
        this.appService.getUsers('')
        .subscribe(kroliczki => this.users = kroliczki,
        error => this.errorMessage = <any>error
        );
    }

    onSelect(users: any): void {
        if (users === this.selectedUser) {
        this.selectedUser = null;
        }
        else {
        this.selectedUser = users;
            }
    }

    checkSchedule() {
        this.router.navigate(['edit/doctor', this.selectedUser.login, 'schedule']);
    }


    editUser() {
            this.router.navigate(['users-list', this.selectedUser.login/*name.replace(/ /g, '').toLowerCase()*/]);
    }

    deleteUser() {
            this.adminService.deleteUser( this.selectedUser.login )
                .subscribe(() => this.getUsers(),
                error => this.errorMessage = <any>error);
        }


}

