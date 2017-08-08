import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { Doctor } from '../classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './doctor-add.component.html',
    styleUrls: ['./admin.component.css', './doctor-add.component.css'],
})

export class DoctorAddComponent implements OnInit {
    errorMessage: any;
    doctor: Doctor;
    genders = ['male', 'female'];
    doctorAddForm: FormGroup;

    constructor(
        private appService: AppService,
        private router: Router,
        private fb: FormBuilder) {

        this.doctor = new Doctor('', '', '', '', '', undefined, '', '', '', '', '', '');
    }

    ngOnInit(): void {
        this.doctorAddForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            login: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
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
        this.appService.addNewDoctor(this.doctor)
            .subscribe(result => {
                if (result === 'OK')
                    this.back()
                else
                    alert("juz istnieje taki ktosiek");
            },
            error => this.errorMessage = <any>error);
    }

    back() {
        this.router.navigate(['admin']);
    }
}
