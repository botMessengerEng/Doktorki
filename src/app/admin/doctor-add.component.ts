import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '../classes/user';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
    templateUrl: './doctor-add.component.html',
    styleUrls: ['./admin-style.css', '../shared/forms-style.css', '../shared/layout.css', '../shared/specializations-style.css'],
})

export class DoctorAddComponent implements OnInit {
    errorMessage: any;
    doctor: Doctor;
    genders = ['male', 'female'];
    doctorAddForm: FormGroup;

    get specializations(): FormArray {
        return <FormArray>this.doctorAddForm.get('specializations');
    }

    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder) {

        this.doctor = new Doctor('', '', '', '', '', undefined, '', '', '', '', '', [{specialization: ''}]);
    }

    ngOnInit(): void {
        this.doctorAddForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: [],
            age: ['', [Validators.pattern('^[0-9]+$')]],
            phone: [],
            email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            street: [],
            postcode: [],
            city: [],
            specializations: this.fb.array( [this.buildSpecialization()])
        });

         this.doctorAddForm.get('firstName').valueChanges.subscribe(value => this.doctor.firstName = this.doctorAddForm.get('firstName').value);
         this.doctorAddForm.get('lastName').valueChanges.subscribe(value => this.doctor.lastName = this.doctorAddForm.get('lastName').value);
         this.doctorAddForm.get('specializations').valueChanges.subscribe(value => this.doctor.specializations = this.doctorAddForm.get('specializations').value);
         this.doctorAddForm.get('password').valueChanges.subscribe(value => this.doctor.gender = this.doctorAddForm.get('password').value);
         this.doctorAddForm.get('login').valueChanges.subscribe(value => this.doctor.login = this.doctorAddForm.get('login').value);
         this.doctorAddForm.get('age').valueChanges.subscribe(value => this.doctor.age = this.doctorAddForm.get('age').value);
         this.doctorAddForm.get('phone').valueChanges.subscribe(value => this.doctor.phone = this.doctorAddForm.get('phone').value);
         this.doctorAddForm.get('email').valueChanges.subscribe(value => this.doctor.email = this.doctorAddForm.get('email').value);
         this.doctorAddForm.get('street').valueChanges.subscribe(value => this.doctor.address.street = this.doctorAddForm.get('street').value);
         this.doctorAddForm.get('postcode').valueChanges.subscribe(value => this.doctor.address.postcode = this.doctorAddForm.get('postcode').value);
         this.doctorAddForm.get('city').valueChanges.subscribe(value => this.doctor.address.city = this.doctorAddForm.get('city').value);
}

    addSpecialization(): void {
        this.specializations.push(this.buildSpecialization());
    }

    deleteSpecialization(specialization): void {
        const control = <FormArray>this.doctorAddForm.controls['specializations'];
        control.removeAt(specialization);
    }


    buildSpecialization(): FormGroup {
        return this.fb.group({
            specialization: '',
        });
    }

    onSubmit() {
            this.appService.addNewDoctor(this.doctor)
                .subscribe(result => {
                    if (result === 'OK') {
                        this.back()
                    }
                    else
                        alert("juz istnieje taki ktosiek");
                },
                error => this.errorMessage = <any>error)
    }

    back() {
        this.router.navigate(['admin/manage/doctors']);
    }


}
