import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { DoctorEditComponent } from "app/admin/doctor-edit.component";

@Component({
  selector: 'app-doctor-edit-form',
  templateUrl: './doctor-edit-form.component.html',
  styleUrls: ['./forms-style.css', '../admin/admin-style.css', './layout.css'],
})

export class DoctorEditFormComponent implements OnInit /*AfterViewInit*/ {
  @Input() doctor: any;
  @Input() admin;
  login: string;
  errorMessage: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;
  controlMessage= new Array();

  private validationMessages = {
    required: [
      'First name is required',
      'Last name is required',
    ]
  }


get spec(): FormArray{
  return <FormArray>this.doctorEditForm.get('spec');
}
  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

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

      spec: this.fb.array(['' , '']),
    });

    const firstNameControl = this.doctorEditForm.get('firstName');
    firstNameControl.valueChanges.subscribe(value =>
      this.setMessage(firstNameControl, 0));

    const lastNameControl = this.doctorEditForm.get('lastName');
    lastNameControl.valueChanges.subscribe(value =>
      this.setMessage(lastNameControl, 1));
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


  createNewSpecControlName(): FormGroup{
    return this.fb.group({
    specialization: ''
    });
  }


  setMessage(c: AbstractControl, i:number): void {
    this.controlMessage[i] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.controlMessage[i]= Object.keys(c.errors).map(key =>
        this.validationMessages[key][i]).join(' ');
    }
  }



}
