import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { Doctor } from '../classes/user';

@Component({
    templateUrl: './doctor-add.component.html',
    styleUrls: ['./admin.component.css', './doctor-add.component.css'],
})

export class DoctorAddComponent {
    errorMessage: any;
    doctor: Doctor;
    genders = ['male', 'female'];

    constructor(private appService: AppService, private router: Router) {
        this.doctor = new Doctor('', '','', '', '', undefined, '', '', '', '', '', '');
    }





    onSubmit() {
        this.appService.addNewDoctor({ login: this.doctor.login,
                                        firstName: this.doctor.firstName,
                                        lastName: this.doctor.lastName,
                                        password: this.doctor.password,
                                        gender: this.doctor.gender,
                                        age: this.doctor.age,
                                        phone: this.doctor.phone,
                                        email: this.doctor.email,
                                        address: {
                                            street: this.doctor.address.street,
                                            postcode: this.doctor.address.postcode,
                                            city: this.doctor.address.city
                                        },
                                        specialization: this.doctor.specialization })
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
