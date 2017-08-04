import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./admin.component.css', './doctor-edit.component.css'],
})

export class DoctorEditComponent implements OnInit {
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


    deleteAndBackToAdminPage() {
        this.appService.deleteQuery({login: this.doctor[0].login} )
        .subscribe(() => this.back(),
         error => this.errorMessage = <any>error);
  }

   back() {
    this.router.navigate(['admin']);
  }

}
