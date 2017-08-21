import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  template:    `<div class='container'>
                    <nav class='menu'>
                        <div> Doktorki </div>
                        <div><a [routerLink]="['/doctor', login, 'schedule']">schedule</a> </div>
                        <div> <a routerLink="/login">find patient</a> </div>
                        <div> <a [routerLink]="['/doctor', login, 'edit']">edit profile</a> </div>
                        <div><a routerLink="/login">log out</a> </div>
                    </nav>
                    <div class='content'>
                         <app-calendar [login]="login"></app-calendar>
                        </div>
                </div>`,
  styleUrls: ['./doctor-style.css', '../shared/layout.css']
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
