import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./admin.component.css', './doctor-edit.component.css'],
})

export class DoctorEditComponent implements OnInit {
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLoginFromUrl().then(() => this.getDoctor());
    this.doctorEditForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [],
      age: [],
      phone: [],
      email: [],
      street: [],
      postcode: [],
      city: [],

      specialization: [],
    });
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
    });
  }

  onSubmit() {
    this.appService.updateQuery(this.doctor[0]
    )
      .subscribe(() => null,
      error => this.errorMessage = <any>error);
  }


  deleteAndBackToAdminPage() {
    this.appService.deleteQuery({ login: this.doctor[0].login })
      .subscribe(() => this.back(),
      error => this.errorMessage = <any>error);
  }

  back() {
    this.router.navigate(['admin']);
  }

}
