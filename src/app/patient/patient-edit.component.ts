import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { Patient } from "app/classes/user";

@Component({
  template: `<div class='container'>
                  <nav class='menu'>
                    <div> Doktorki </div>
                    <div><a routerLink="/login">schedule</a> </div>
                    <div> <a routerLink="/login">find doctor</a> </div>
                    <div> <a [routerLink]="['/patient', login, 'edit']" class='set'>edit profile</a> </div>
                    <div><a routerLink="/login">log out</a> </div>
                </nav>
              <div class='content'>
                <div *ngIf="patient!=undefined"><app-patient-edit-form [patient]="patient[0]" [admin]="false"></app-patient-edit-form></div>
            </div>
            </div> `,
  styleUrls: ['./patient-style.css', '../shared/layout.css']
})

export class PatientEditComponent implements OnInit{
  
  patient: any;
  login: string;
  errorMessage: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;
  x:any;

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

ngOnInit(): void {
    this.getLoginFromUrl().then(() => this.getPatient());
  }

  getPatient() {
        this.appService.findPatient({ login: this.login })
            .subscribe((patient) => this.patient = patient);
    }

    getLoginFromUrl() {
        this.login = this.route.snapshot.params['login'];
        return new Promise(resolve => {
      resolve(true);
    });
    }


}

