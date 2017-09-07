import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { DoctorEditComponent } from 'app/admin/doctor-edit.component';

@Component({
  selector: 'app-doctor-edit-form',
  templateUrl: './doctor-edit-form.component.html',
  styleUrls: ['./forms-style.css', '../admin/admin-style.css', './layout.css', './specializations-style.css'],
})

export class DoctorEditFormComponent implements OnInit {
  @Input() doctor: any;
  @Input() admin;
  login: string;
  errorMessage: any;
  genders = ['male', 'female'];
  doctorEditForm: FormGroup;
  controlMessage = new Array();
  specializationsTemp = new Array<FormGroup>();
  private validationMessages = {
    required: [
      'First name is required',
      'Last name is required',
    ]
  }
  get specializations(): FormArray {
    return <FormArray>this.doctorEditForm.get('specializations');
  }

  get spec(): FormArray {
    return <FormArray>this.doctorEditForm.get('spec');
  }
  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.doctorEditForm = this.fb.group({
      firstName: [this.doctor.firstName, Validators.required],
      lastName: [this.doctor.lastName, Validators.required],
      gender: [this.doctor.gender],
      age: [this.doctor.age],
      phone: [this.doctor.phone],
      email: [this.doctor.email],
      street: [this.doctor.address.street],
      postcode: [this.doctor.address.postcode],
      city: [this.doctor.address.city],
      specializations: this.fb.array(this.specializationInit())
    });

    this.doctorEditForm.get('firstName').valueChanges.subscribe(value => this.doctor.firstName = this.doctorEditForm.get('firstName').value);
    this.doctorEditForm.get('lastName').valueChanges.subscribe(value => this.doctor.lastName = this.doctorEditForm.get('lastName').value);
    this.doctorEditForm.get('age').valueChanges.subscribe(value => this.doctor.age = this.doctorEditForm.get('age').value);
    this.doctorEditForm.get('gender').valueChanges.subscribe(value => this.doctor.gender = this.doctorEditForm.get('gender').value);
    this.doctorEditForm.get('phone').valueChanges.subscribe(value => this.doctor.phone = this.doctorEditForm.get('phone').value);
    this.doctorEditForm.get('email').valueChanges.subscribe(value => this.doctor.email = this.doctorEditForm.get('email').value);
    this.doctorEditForm.get('street').valueChanges.subscribe(value => this.doctor.address.street = this.doctorEditForm.get('street').value);
    this.doctorEditForm.get('postcode').valueChanges.subscribe(value => this.doctor.address.postcode = this.doctorEditForm.get('postcode').value);
    this.doctorEditForm.get('city').valueChanges.subscribe(value => this.doctor.address.city = this.doctorEditForm.get('city').value);
    this.doctorEditForm.get('specializations').valueChanges.subscribe(value => this.doctor.specializations = this.doctorEditForm.get('specializations').value);

    const firstNameControl = this.doctorEditForm.get('firstName');
    firstNameControl.valueChanges.subscribe(value =>
      this.setMessage(firstNameControl, 0));

    const lastNameControl = this.doctorEditForm.get('lastName');
    lastNameControl.valueChanges.subscribe(value =>
      this.setMessage(lastNameControl, 1));
  }

  addSpecialization(): void {
    this.specializations.push(this.buildSpecialization());
  }

  deleteSpecialization(specialization): void {
    const control = <FormArray>this.doctorEditForm.controls['specializations'];
    control.removeAt(specialization);
  }

  buildSpecialization(): FormGroup {
    return this.fb.group({
      specialization: '',
    });
  }

  specializationInit() {
    for (let i = 0; i < this.doctor.specializations.length; i++) {
      this.specializationsTemp[i] = this.fb.group({ specialization: this.doctor.specializations[i].specialization })
    }

    return this.specializationsTemp;

  }

  onSubmit() {
    this.appService.updateQuery(this.doctor)
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


  createNewSpecControlName(): FormGroup {
    return this.fb.group({
      specialization: ''
    });
  }


  setMessage(c: AbstractControl, i: number): void {
    this.controlMessage[i] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.controlMessage[i] = Object.keys(c.errors).map(key =>
        this.validationMessages[key][i]).join(' ');
    }
  }

}
