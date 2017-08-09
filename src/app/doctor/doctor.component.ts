import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
import { SharedModule } from '../shared/shared.module';

@Component({
    templateUrl:    'doctor.component.html',
    styleUrls:      [ 'doctor.component.css']
})

export class DoctorComponent implements OnInit{
  login: string;
  errorMessage: any;
  doctor: any;
  genders = ['male', 'female'];

  constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLoginFromUrl().then(() => this.getDoctor());
  }

  getDoctor() {
    return new Promise(resolve => {
      this.appService.postQuery({ role: 'doctor', login: this.login })
        .subscribe((doctor) => this.doctor = doctor);
      resolve(true);
    });
  }

  getLoginFromUrl() {
    this.login = this.route.snapshot.params['login'];
    return new Promise(resolve => {
      resolve(true);
    });
  }

  onSubmit() {
    this.appService.updateQuery({ login: this.doctor[0].login,
                                  firstName: this.doctor[0].firstName,
                                  lastName: this.doctor[0].lastName,
                                  gender: this.doctor[0].gender,
                                  age: this.doctor[0].age,
                                  phone: this.doctor[0].phone,
                                  email: this.doctor[0].email,
                                  address: {
                                    street: this.doctor[0].address.street,
                                    postcode: this.doctor[0].address.postcode,
                                    city: this.doctor[0].address.city
                                  },
                                  specialization: this.doctor[0].specialization })
        .subscribe(() => null,
         error => this.errorMessage = <any>error);
  }

}
