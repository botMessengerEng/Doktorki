import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  template: `<div class='container'>
                  <nav class='menu'>
                     <div> Doktorki </div>
                     <div> <a routerLink="/admin/add/doctor">add doctor</a> </div>
                     <div><a routerLink="/admin/manage/doctors" class='set'>manage doctors</a> </div>
                     <div> <a routerLink="/admin/add/patient">add patient</a> </div>
                     <div> <a routerLink="/login">manage patients</a> </div>
                     <div><a routerLink="/login">log out</a> </div>
                </nav>

              <div class='content'>
                <div *ngIf="doctor!=undefined"><app-doctor-edit-form [doctor]="doctor[0]" [admin]="true"></app-doctor-edit-form></div>
              </div>
            </div> `,

    styleUrls: ['./admin-style.css', '../shared/forms-style.css', '../shared/layout.css']
})

export class DoctorEditComponent implements OnInit {
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLoginFromUrl().then(() => this.getDoctor());
  }

  getDoctor() {
      this.appService.postQuery({ role: 'doctor', login: this.login })
        .subscribe((doctor) => this.doctor = doctor);
  }

  getLoginFromUrl() {
    this.login = this.route.snapshot.params['login'];
    return new Promise(resolve => {
      resolve(true);
    });
  }

}
