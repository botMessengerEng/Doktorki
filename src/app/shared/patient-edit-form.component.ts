import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';

import { AppService } from 'app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../classes/user';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { dayMonthCheck } from './day-month-check.directives';
import { DataArrays } from '../classes/data-arrays';
@Component({
    selector: 'app-patient-edit-form',
    templateUrl: './patient-edit-form.component.html',
    styleUrls: ['./forms-style.css',  '../admin/admin-style.css', './layout.css'],
})

export class PatientEditFormComponent implements OnInit {
    errorMessage: any;
    @Input() admin: boolean;
    @Input() patient: any;
    patientEditForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    dataArrays = new DataArrays;
    invalid: boolean;
    errMessage: any;
    genders = ['male', 'female'];
    
    constructor(private router: Router,
        private appService: AppService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.dataArrays.daysGenerator();
        this.dataArrays.yearsGenerator();
        this.invalid = false;

        this.patientEditForm = this.fb.group({
            firstName: [this.patient.firstName, [Validators.required]],
            lastName: [this.patient.lastName, [Validators.required]],
            gender: [this.patient.gender, [Validators.required]],
            phone: [this.patient.phone, [Validators.required]],
            email: [this.patient.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            PESEL: [this.patient.PESEL, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            dayMonthGroup: this.fb.group({
                month: [this.patient.dateOfBirth.month],
                day: [this.patient.dateOfBirth.day],
                year: [this.patient.dateOfBirth.year]
            }, {validator: dayMonthCheck}),
        })

            this.patientEditForm.get('firstName').valueChanges.subscribe(value => this.patient.firstName = this.patientEditForm.get('firstName').value);
            this.patientEditForm.get('lastName').valueChanges.subscribe(value => this.patient.lastName = this.patientEditForm.get('lastName').value);
            this.patientEditForm.get('gender').valueChanges.subscribe(value => this.patient.gender = this.patientEditForm.get('gender').value);
            this.patientEditForm.get('phone').valueChanges.subscribe(value => this.patient.phone = this.patientEditForm.get('phone').value);
            this.patientEditForm.get('email').valueChanges.subscribe(value => this.patient.email = this.patientEditForm.get('email').value);
            this.patientEditForm.get('PESEL').valueChanges.subscribe(value => this.patient.PESEL = this.patientEditForm.get('PESEL').value);
            this.patientEditForm.get('dayMonthGroup.year').valueChanges.subscribe(value => this.patient.dateOfBirth.year = this.patientEditForm.get('dayMonthGroup.year').value);
            this.patientEditForm.get('dayMonthGroup.month').valueChanges.subscribe(value => this.patient.dateOfBirth.month = this.patientEditForm.get('dayMonthGroup.month').value);
            this.patientEditForm.get('dayMonthGroup.day').valueChanges.subscribe(value => this.patient.dateOfBirth.day = this.patientEditForm.get('dayMonthGroup.day').value);
}

    onSubmit() {
        this.appService.updatePatient(this.patient)
      .subscribe(() => null,
      error => this.errorMessage = <any>error);
    }


    back() {
        if (this.admin){
          this.router.navigate(['admin/manage/doctors']);
        }
        else{
        this.router.navigate(['login']);
        }
    }

    yearsGenerator() {
        for (let i = 0; i <= 107; i++) {
            this.yearsArray[i] = 1910 + i;
        }
    }

    daysGenerator() {
        if (this.patient.dateOfBirth.month === 'February') {
            for (let i = 0; i <= 28; i++) {
                this.daysArray[i] = i + 1;
            }
        }

        else {
            for (let i = 0; i <= 30; i++) {
                this.daysArray[i] = i + 1;
            }
        }
    }

}
