import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import {  whichSelectedDoctor } from './admin.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./admin.component.css', './doctor-edit.component.css'],
})

export class DoctorEditComponent{
  login: number;
  errorMessage: any;
  doctor= whichSelectedDoctor;
  constructor(private router: Router,
              private userService: AppService,
              private route: ActivatedRoute)
      {
            this.route.params.subscribe(params => {
            this.login = params['name'];
          });
          
          console.log(this.login);
      }



}









