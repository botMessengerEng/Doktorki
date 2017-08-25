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
    selectedDoctor: any;
    doctorFilter: string = '';

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
        if (users === this.selectedDoctor) {
        this.selectedDoctor = null;
        }
        else {
        this.selectedDoctor = users;
            }
    }

    checkSchedule() {
        this.router.navigate(['admin/edit/doctor', this.selectedDoctor.login, 'schedule']);
    }


    editDoctor() {
            this.router.navigate(['admin/edit/doctor', this.selectedDoctor.login/*name.replace(/ /g, '').toLowerCase()*/]);
    }

        // deleteAndBackToAdminPage() {
        //     this.appService.deleteQuery({ login: this.selectedDoctor.login })
        //         .subscribe(() => this.getDoctors(),
        //         error => this.errorMessage = <any>error);
        // }


}

