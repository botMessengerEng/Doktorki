import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { SharedModule } from '../shared/shared.module';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl:    'doctor.component.html',
  styleUrls: ['./doctor-style.css', '../shared/layout.css']
})

export class DoctorComponent implements OnInit{
  login: string;
  errorMessage: any;
  visits:any;
  visitsArray = new Array(5);
  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
   this.login = this.route.snapshot.params['login'];
   this.getVisits()
    .then(param => this.visits = param)
  }

  getVisits(){
       return this.appService.findVisits({login: this.login}, 5).toPromise()
  }




}
