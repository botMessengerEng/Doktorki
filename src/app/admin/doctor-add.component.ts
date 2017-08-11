import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '../classes/user';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
    templateUrl: './doctor-add.component.html',
    styleUrls: ['./admin-style.css', '../shared/forms-style.css', '../shared/layout.css']
})

export class DoctorAddComponent implements OnInit {
    errorMessage: any;
    doctor: Doctor;
    genders = ['male', 'female'];
    doctorAddForm: FormGroup;

    get addresses(): FormArray{
        return <FormArray>this.doctorAddForm.get('addresses');
    }
    constructor(
        private appService: AppService,
        private route: ActivatedRoute,
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
            age: [' ', [Validators.pattern('^[0-9]+$')]],
            phone: [],
            email: ['',  [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            street: [],
            postcode: [],
            city: [],
            specialization: [],  
            addresses: this.fb.array([ this.buildAddress() ])
        });

    }

  addAddress(): void {
        this.addresses.push(this.buildAddress());
    }

    buildAddress(): FormGroup {
        return this.fb.group({
                addressType: 'home',
                street1: '',
                street2: '',
                city: '',
                state: '',
                zip: ''
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
        this.router.navigate(['admin/manage/doctors']);
    }

}
