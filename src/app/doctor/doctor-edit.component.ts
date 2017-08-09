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
                    <div><a routerLink="/login">schedule</a> </div>
                    <div> <a routerLink="/login">find patient</a> </div>
                    <div> <a [routerLink]="['/doctor', login, 'edit']">edit profile</a> </div>
                    <div><a routerLink="/login">log out</a> </div>
                </nav>

              <div class='content'>
                <div *ngIf="doctor!=undefined"><app-doctor-edit-form [doctor]="doctor[0]" [admin]="false"></app-doctor-edit-form>
              </div> `,

  styleUrls: ['../doctor/doctor.component.css']

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
    return new Promise(resolve => {
      this.appService.postQuery({ role: 'doctor', login: this.login })
        .subscribe((doctor) => this.doctor = doctor);
      resolve(true);
    });
  }

  getLoginFromUrl() {
    this.login = this.route.snapshot.params['login'];
    return new Promise(resolve => {
      resolve(true);
              console.log(this.doctor[0].age);
    });
  }

a(){
    console.log(this.doctor[0].age);
}
}

