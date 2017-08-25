import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';

import { NameFilterPipe } from '../../shared/pipes/name-filter.pipe';

@Component({
    templateUrl: './doctor-list.component.html',
    styleUrls: ['./doctor-list.component.css']
})

export class DoctorsListComponent implements OnInit {
  errorMessage: any;
  doctors: any;
  selectedDoctor: any;
  doctorFilter: string = '';

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.appService.getUsers('doctor')
      .subscribe(kroliczki => this.doctors = kroliczki,
      error => this.errorMessage = <any>error
      );
  }

  onSelect(doctor: any): void {
    if (doctor === this.selectedDoctor) {
      this.selectedDoctor = null;
    }
    else {
      this.selectedDoctor = doctor;
        }
  }

  checkSchedule() {
      this.router.navigate(['admin/edit/doctor', this.selectedDoctor.login, 'schedule']);
  }

}