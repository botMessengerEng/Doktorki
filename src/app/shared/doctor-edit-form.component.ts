import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-edit-form',
  templateUrl: './doctor-edit-form.component.html',
  styleUrls: ['./forms-style.css',  '../admin/admin-style.css', './layout.css'],
})

export class DoctorEditFormComponent implements OnInit {
  @Input() doctor: any;
  @Input() admin;
  login: string;
  errorMessage: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
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


  onSubmit() {
    this.appService.updateQuery(this.doctor
    )
      .subscribe(() => null,
      error => this.errorMessage = <any>error);
  }

 deleteAndBackToAdminPage() {
    this.appService.deleteQuery({ login: this.doctor.login })
      .subscribe(() => this.back(),
      error => this.errorMessage = <any>error);
  }

  back() {
    this.router.navigate(['admin/manage/doctors']);
  }

}
