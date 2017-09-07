import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';

import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { Patient } from '../classes/user';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { dayMonthCheck } from './day-month-check.directives';
import { DataArrays } from '../classes/data-arrays';


@Component({
    selector: 'app-patient-add-form',
    templateUrl: './patient-add-form.component.html',
    styleUrls: ['./forms-style.css', '../admin/admin-style.css', './layout.css'],
})

export class PatientAddFormComponent implements OnInit {
    @Input() admin: boolean;
    patientAddForm: FormGroup;
    invalid: boolean;
    errMessage: any;
    patient: Patient;
    genders = ['male', 'female'];
    dataArrays = new DataArrays;
    constructor(private appService: AppService, private router: Router, private fb: FormBuilder ) {
        this.patient = new Patient('', '', '', '', undefined, undefined, '', '', undefined, undefined, undefined, '');
    }

    ngOnInit() {
        this.dataArrays.daysGenerator();
        this.dataArrays.yearsGenerator();
        this.invalid = false;

        this.patientAddForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            PESEL: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            dayMonthGroup: this.fb.group({
                month: [''],
                day: [''],
                year: ['']
            }, { validator: dayMonthCheck }),
        })

            this.patientAddForm.get('firstName').valueChanges.subscribe(value => this.patient.firstName = this.patientAddForm.get('firstName').value);
            this.patientAddForm.get('lastName').valueChanges.subscribe(value => this.patient.lastName = this.patientAddForm.get('lastName').value);
            this.patientAddForm.get('login').valueChanges.subscribe(value => this.patient.login = this.patientAddForm.get('login').value);
            this.patientAddForm.get('password').valueChanges.subscribe(value => this.patient.password = this.patientAddForm.get('password').value);
            this.patientAddForm.get('gender').valueChanges.subscribe(value => this.patient.gender = this.patientAddForm.get('gender').value);
            this.patientAddForm.get('phone').valueChanges.subscribe(value => this.patient.phone = this.patientAddForm.get('phone').value);
            this.patientAddForm.get('email').valueChanges.subscribe(value => this.patient.email = this.patientAddForm.get('email').value);
            this.patientAddForm.get('PESEL').valueChanges.subscribe(value => this.patient.PESEL = this.patientAddForm.get('PESEL').value);
            this.patientAddForm.get('dayMonthGroup.year').valueChanges.subscribe(value => this.patient.dateOfBirth.year = this.patientAddForm.get('dayMonthGroup.year').value);
            this.patientAddForm.get('dayMonthGroup.month').valueChanges.subscribe(value => this.patient.dateOfBirth.month = this.patientAddForm.get('dayMonthGroup.month').value);
            this.patientAddForm.get('dayMonthGroup.day').valueChanges.subscribe(value => this.patient.dateOfBirth.day = this.patientAddForm.get('dayMonthGroup.day').value);
    }

    onSubmit() {
        this.appService.addNewUser(this.patient)
            .subscribe((result) => {
                if (result === 'OK')
                    this.back();
                else
                    this.invalid = true;
            }
            , err => this.errMessage = err)
    }


    back() {
        if (this.admin) {
            this.router.navigate(['admin/manage/doctors']);
        }
        else {
            this.router.navigate(['login']);
        }
    }


}
