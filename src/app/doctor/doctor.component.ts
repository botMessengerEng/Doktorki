import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { SharedModule } from '../shared/shared.module';

@Component({
    templateUrl:    'doctor.component.html',
  styleUrls: ['./doctor-style.css', '../shared/layout.css']
})

export class DoctorComponent implements OnInit{
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
