import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';

import { AppService } from 'app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../classes/user';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


export const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'Novermber', 'December'];

function dayMonthCheck(c: AbstractControl): { [key: string]: boolean } | null {
    const month = c.get('month');
    const day = c.get('day');
    const year = c.get('year');

    if (month.value === 'February' && (day.value < 29 || (day.value == 29 && ((year.value % 100 === 0) ? (year.value % 400 === 0) : (year.value % 4 === 0))))) {
        return null;
    } else if (day.value < 31 && (month.value === monthsArray[3] ||
        month.value === monthsArray[5] ||
        month.value === monthsArray[8] ||
        month.value === monthsArray[10])) {
        return null;

    } else if (day.value <= 31 && (month.value === monthsArray[0] ||
        month.value === monthsArray[2] ||
        month.value === monthsArray[4] ||
        month.value === monthsArray[6] ||
        month.value === monthsArray[7] ||
        month.value === monthsArray[9] ||
        month.value === monthsArray[11])) {
        return null;
    } else {
        return { 'error': true };
    }
}

@Component({
    selector: 'app-patient-edit-form',
    templateUrl: './patient-edit-form.component.html',
    styleUrls: ['./forms-style.css',  '../admin/admin-style.css', './layout.css'],
})

export class PatientEditFormComponent implements OnInit {
    errorMessage: any;
    @Input() admin: boolean;
    @Input() patient: any;
    patientForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
    invalid: boolean;

    errMessage: any;
    genders = ['male', 'female'];
    
    constructor(private router: Router,
        private appService: AppService,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.yearsGenerator();
        this.daysGenerator();
        this.invalid = false;

        this.patientForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            gender: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            PESEL: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            dayMonthGroup: this.fb.group({
                month: [''],
                day: [''],
                year: ['']
            }, {validator: dayMonthCheck}),
        }

        )
    }

    onSubmit() {
        this.appService.updateQuery(this.patient)
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