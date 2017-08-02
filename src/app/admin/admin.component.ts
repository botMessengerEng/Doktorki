import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { trigger, style, transition, animate, group } from '@angular/core';
import { Router } from '@angular/router';

export let whichSelectedDoctor;

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('tableOfDoctors', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate(350)
      ]),
    ])
  ]
})

export class AdminComponent implements OnInit {
  errorMessage: any;
  doctors: any;
  selectedDoctor: any;
  constructor(private appService: AppService, private router: Router) {
  }


  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.appService.getQuery()
      .subscribe(kroliczki => this.doctors = kroliczki,
      error => this.errorMessage = <any>error);
  }

  onSelect(doctor: any): void {
    if (doctor === this.selectedDoctor) {
      this.selectedDoctor = null;
    }
    else {
      this.selectedDoctor = doctor;
      whichSelectedDoctor = this.selectedDoctor;
    }
  }

  editDoctor() {
    this.router.navigate(['admin/edit/doctor', this.selectedDoctor.login/*name.replace(/ /g, '').toLowerCase()*/]);
  }

  deleteAndBackToAdminPage() {
    this.appService.deleteQuery({ login: this.selectedDoctor.login })
      .subscribe(() => this.getDoctors(),
      error => this.errorMessage = <any>error);
  }


}

