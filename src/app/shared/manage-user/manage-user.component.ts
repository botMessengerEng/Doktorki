import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Patient, Doctor } from 'app/shared/classes/user';
import { DateArrays } from 'app/shared/classes/date-arrays';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { dayMonthCheck } from 'app/shared/manage-user/day-month-check.directives';

@Component({
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

    @Input() admin: boolean;
    userForm: FormGroup;
    invalid: boolean;
    errMessage: any;
    user: any;
    genders = ['male', 'female'];
    dateArrays = new DateArrays;
    constructor(private appService: AppService, private router: Router, private fb: FormBuilder) {
        if (appService.url = 'register') {
            this.user = new Patient('', '', '', '', undefined, undefined, '', '', undefined, undefined, undefined, '');
        }
    }

    ngOnInit() {
        this.dateArrays.daysGenerator();
        this.dateArrays.yearsGenerator();
        this.invalid = false;

        this.userForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            PESEL: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            dayMonthGroup: this.fb.group({
                month: [''],
                day: [''],
                year: ['']
            }, { validator: dayMonthCheck }),
        });

        this.userForm.get('firstName').valueChanges.subscribe(value => this.user.firstName = this.userForm.get('firstName').value);
        this.userForm.get('lastName').valueChanges.subscribe(value => this.user.lastName = this.userForm.get('lastName').value);
        this.userForm.get('login').valueChanges.subscribe(value => this.user.login = this.userForm.get('login').value);
        this.userForm.get('password').valueChanges.subscribe(value => this.user.password = this.userForm.get('password').value);
        this.userForm.get('gender').valueChanges.subscribe(value => this.user.gender = this.userForm.get('gender').value);
        this.userForm.get('phone').valueChanges.subscribe(value => this.user.phone = this.userForm.get('phone').value);
        this.userForm.get('email').valueChanges.subscribe(value => this.user.email = this.userForm.get('email').value);
        this.userForm.get('PESEL').valueChanges.subscribe(value => this.user.PESEL = this.userForm.get('PESEL').value);
        this.userForm.get('dayMonthGroup.year').valueChanges.subscribe(value => this.user.dateOfBirth.year = this.userForm.get('dayMonthGroup.year').value);
        this.userForm.get('dayMonthGroup.month').valueChanges.subscribe(value => this.user.dateOfBirth.month = this.userForm.get('dayMonthGroup.month').value);
        this.userForm.get('dayMonthGroup.day').valueChanges.subscribe(value => this.user.dateOfBirth.day = this.userForm.get('dayMonthGroup.day').value);
    }

    onSubmit() {
        this.appService.addPatient(this.user)
            .subscribe((result) => {
                if (result === 'OK') {
                    this.back();
                }
                else {
                    this.invalid = true;
                }
            }
            , err => this.errMessage = err);
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
