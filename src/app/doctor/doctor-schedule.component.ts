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
              <div *ngIf="doctor!=undefined">
                    <app-schedule [doctor]="doctor[0]" [appointments]="appointments" [date]="date"></app-schedule>
                   </div>
              </div></div> `,

  styleUrls: ['./doctor-style.css', '../shared/layout.css']

})

export class DoctorScheduleComponent implements OnInit {
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];
  day:any;
  appointments:any;
  date=new Date();
  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) {
  }

   ngOnInit(): void {
    this.getLoginFromUrl()
      .then(() => this.getDoctor())
      .then(() => this.getDateFromUrl())
      .then(() => this.getDoctorAppointments());
  }

  getDoctor() {
      this.appService.postQuery({ login: this.login })
        .subscribe((doctor) => this.doctor = doctor);
          return new Promise(resolve => {
      resolve(true);
    });
  }

  getLoginFromUrl() {
    this.login = this.route.snapshot.params['login'];
    return new Promise(resolve => {
      resolve(true);
    });
  }

  getDateFromUrl() {
    this.date.setDate( this.route.snapshot.params['day']);
    this.date.setMonth(this.route.snapshot.params['month']-1);
    this.date.setFullYear(this.route.snapshot.params['year']);
    return new Promise(resolve => {
      resolve(true);
    });
  }

  getDoctorAppointments(){
    this.appService.findVisits({ login: this.login, date: { year: this.date.getFullYear(),
                                                            month: 'August',
                                                            day: this.date.getDate()
                                                          }
    }).subscribe((appointments) => this.appointments = appointments);
  }

}

