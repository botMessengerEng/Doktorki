import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@Component({
  template: `   <div class='container'>
                  <nav class='menu'>
                    <div> Doktorki </div>
                    <div><a [routerLink]="['/doctor', login, 'schedule']"  class='set'>schedule</a> </div>
                    <div> <a routerLink="/login">find patient</a> </div>
                    <div> <a [routerLink]="['/doctor', login, 'edit']" >edit profile</a> </div>
                    <div><a routerLink="/login">log out</a> </div>
                </nav>

              <div class='content'>
              <div *ngIf="patient!=undefined && singleAppointment!=undefined && doctor!=undefined">
              <app-appontments-details [patient]="patient[0]" [singleAppointment]="singleAppointment" [appointments]="appointments" [doctor]="doctor[0]"></app-appontments-details>
              </div>
              </div>
              </div> `,

  styleUrls: ['./doctor-style.css', '../shared/layout.css']

})

export class DoctorAppointmentsDetailsComponent implements OnInit {
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];
  day: any;
  appointments: any;
  singleAppointment:any;
  date = new Date();
  hour: any;
  minutes: any;
  hourValidFormat: any;
  patient: any;
  monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLoginFromUrl()
      .then(() => this.getDoctor())
      .then(param => this.doctor = param)
      .then(() => this.getDateFromUrl())
      .then(() => this.getHourFromUrl())
      .then(() => this.changeHourMinutesFormat())
      .then(() => this.getDoctorAppointments())
      .then(param => this.appointments = param)
      .then(() => this.getDoctorSingleAppointment())
      .then(() => this.getPatient());
  }

  getLoginFromUrl() {
    this.login = this.route.snapshot.params['login'];
    return new Promise(resolve => {
      resolve(true);
    });
  }

  getDoctor() {
      return this.appService.postQuery({ login: this.login }).toPromise();
        // .subscribe((doctor) => this.doctor = doctor);
  }

  getDateFromUrl() {
    this.date.setDate(this.route.snapshot.params['day']);
    this.date.setMonth(this.route.snapshot.params['month'] - 1);
    this.date.setFullYear(this.route.snapshot.params['year']);
    return new Promise(resolve => {
      resolve(true);
    });
  }

  getHourFromUrl() {
    this.hour = this.route.snapshot.params['hour'];
    this.minutes = this.route.snapshot.params['minutes'];
    return new Promise(resolve => {
      resolve(true);
    });
  }

  changeHourMinutesFormat() {
    this.hourValidFormat = this.hour + ':' + this.minutes;
  }

  getDoctorAppointments() {
    return this.appService.findVisits({
      login: this.login, date: {
        year: this.date.getFullYear(),
        month: this.date.getMonth()+1,
        day: this.date.getDate(),
      }
    }).toPromise();
    // .subscribe((appointments) => this.appointments = appointments);
  }


  getDoctorSingleAppointment(){
     this.singleAppointment = this.appointments.find((element) => this.hourValidFormat == element.date.hour)
     console.log(this.appointments);
       return new Promise(resolve => {
      resolve(true);
    });
  }
  
  getPatient() {
    if (this.singleAppointment != undefined) {
      console.log(this.singleAppointment.patient.login);
      this.appService.findPatient({ login: this.singleAppointment.patient.login })
        .subscribe((patient) => this.patient = patient);
    }
  }

  

}

