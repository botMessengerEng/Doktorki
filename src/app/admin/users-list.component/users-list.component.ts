import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'app/app.service';

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
    onlyDoctors=true;
    onlyPatients=true;

    constructor(private appService: AppService, private router: Router) {}

    ngOnInit(): void {
        this.getUsers();
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
        this.router.navigate(['admin/edit/doctor', this.selectedUser.login, 'schedule']);
    }


    editUser() {
            this.router.navigate(['admin/users-list', this.selectedUser.login/*name.replace(/ /g, '').toLowerCase()*/]);
    }

        // deleteAndBackToAdminPage() {
        //     this.appService.deleteQuery({ login: this.selectedDoctor.login })
        //         .subscribe(() => this.getDoctors(),
        //         error => this.errorMessage = <any>error);
        // }


}

