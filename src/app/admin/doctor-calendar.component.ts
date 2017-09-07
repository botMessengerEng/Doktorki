import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  template:    `<div class='container'>
                  <nav class='menu'>
                     <div> Doktorki </div>
                     <div><a routerLink="/admin/add/doctor">add doctor</a></div>
                     <div><a routerLink="/admin/manage/doctors" class='set'>manage doctors</a></div>
                     <div><a routerLink="/admin/add/patient">add patient</a></div>
                     <div><a routerLink="/login">manage patients</a></div>
                     <div><a routerLink="/login">log out</a> </div>
                </nav>
                    <div class='content'>
                         <div *ngIf='login!=undefined'><app-calendar [login]="login"></app-calendar>
                        </div>
                </div>`,
  styleUrls: ['./admin-style.css', '../shared/layout.css']
})

export class DoctorCalendarComponent implements OnInit{
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
   this.login = this.route.snapshot.params['login'];
  }



}
