import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';

import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { Patient } from '../classes/user';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";



function dayMonthCheck(c: AbstractControl): {[key: string]: boolean} | null {
    let monthControl = c.get('month');
    let dayControl = c.get('day');
    let yearControl = c.get('year');
   
    if (monthControl.value === 'February' && dayControl.value <= 29 && yearControl.value % 4===0) {
      return null;
    }
  
    return { 'months': true };
 }


@Component({
    templateUrl: './register.component.html',
    styleUrls: ['../admin/admin.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {
    patientForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']

    errMessage: any;
     patient: Patient;
    genders = ['male', 'female'];
    constructor(private appService: AppService, private router: Router, private fb: FormBuilder) {
        this.patient = new Patient('', '', '', '', '', undefined, '', '', undefined, undefined, undefined, '');
    }

    ngOnInit() {
        this.yearsGenerator();
        this.daysGenerator();

        this.patientForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: ['', [Validators.required]],
            age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            // year: [''],
            // month: [''],
            // day: [''],
            PESEL: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            dayMonthGroup: this.fb.group({
                month: [''],
                day: [''],
                year: ['']
            }, {validator: dayMonthCheck}),
        }

        )

    }


    onSubmit(user) {
        this.appService.addNewUser(user)
            .subscribe((result) => {
                if (result === 'OK')
                    this.back();
                else
                    alert('login zajety');
            }
            , err => this.errMessage = err)
    }

    back() {
        this.router.navigate(['login']);
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
