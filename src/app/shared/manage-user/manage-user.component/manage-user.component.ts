import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { UserDetails } from 'app/shared/classes/user';
import { DateArrays } from 'app/shared/classes/date-arrays';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { dayMonthCheck } from 'app/shared/manage-user/day-month-check.directives';
import { formBuilder, setContent, buildSpecialization } from 'app/shared/manage-user/form-builder';
import { AuthService } from 'app/auth/auth.service';

@Component({
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
    @Input() admin: boolean;
    invalid: boolean;
    errMessage: any;
    userForm: FormGroup;
    user: any;
    url: any;
    genders = ['male', 'female'];
    dateArrays = new DateArrays();
    roleTmp = "doctor";

    get specializations(): FormArray {
        return <FormArray>this.userForm.get('specializations');
    }

    constructor(private appService: AppService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
            this.url = appService.url;
            this.user = new UserDetails('', '', '', '', undefined, undefined, undefined, '', '', '', '', '');
    }


    ngOnInit() {
        this.setRole();

        this.dateArrays.hoursGenerator();
        this.url = this.route.snapshot.url.join('');
        this.appService.url = this.url;

        this.dateArrays.daysGenerator();
        this.dateArrays.yearsGenerator();
        this.invalid = false;

        this.userForm = formBuilder(this.fb);

        setContent(this.userForm, this.user);
    }

    onSubmit() {
        this.authService.addUser(this.user, this.user.role)
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
            this.router.navigate(['login']);
    }
    


    addSpecialization(): void {
        this.specializations.push(buildSpecialization(this.fb));
    }

    deleteSpecialization(specialization): void {
        const control = <FormArray>this.userForm.controls['specializations'];
        control.removeAt(specialization);
    }



    click() {
        delete this.user.PESEL;
    }

    click2() {
        console.log(this.user);
    }


    detectRoleChange() {
        this.userForm.get('role').valueChanges.subscribe(value => this.setRole());
    }

    async setRole() {
        if (this.user.role == "doctor") {
            this.user.workingHours = {
                monday: {},
                tuesday: {},
                wednesday: {},
                thursday: {},
                friday: {}
            };
            this.user.specializations = [];
        }
        else if (this.user.role == "patient") {
            await Promise.all([
                () => delete this.user.workingHours.monday,
                () => delete this.user.workingHours.tuesday,
                () => delete this.user.workingHours.wednesday,
                () => delete this.user.workingHours.thursday,
                () => delete this.user.workingHours.friday,
            ]);
            await delete this.user.workingHours;
            await delete this.user.specializations;
        }
    }

}
