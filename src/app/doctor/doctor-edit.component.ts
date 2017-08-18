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
                    <div><a [routerLink]="['/doctor', login, 'schedule']">schedule</a> </div>
                    <div> <a routerLink="/login">find patient</a> </div>
                    <div> <a [routerLink]="['/doctor', login, 'edit']" class='set'>edit profile</a> </div>
                    <div><a routerLink="/login">log out</a> </div>
                </nav>
              <div class='content'>
                <div *ngIf="doctor!=undefined"><app-doctor-edit-form [doctor]="doctor[0]" [admin]="false"></app-doctor-edit-form>
            </div>
              </div> </div> `,

  styleUrls: ['./doctor-style.css', '../shared/layout.css']

})

export class DoctorEditComponent implements OnInit {
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;
  x:any;

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

   ngOnInit(): void {
    this.getLoginFromUrl().then(() => this.getDoctor());
  }

  getDoctor() {
      this.appService.postQuery({ login: this.login })
        .subscribe((doctor) => this.doctor = doctor);
  }

  getLoginFromUrl() {
    this.login = this.route.snapshot.params['login'];
    return new Promise(resolve => {
      resolve(true);
    });
  }

}

