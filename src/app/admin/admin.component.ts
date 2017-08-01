import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { trigger, style, transition, animate, group } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
  trigger('tableOfDoctors', [
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate(350)
    ]),
  ])
]
})

export class AdminComponent implements OnInit {
  errorMessage: any;
  doctors: any;
  selectedDoctor: any;
  constructor(private appService: AppService){
  //  this.doctors = [['Hannah Baker', 'od uszów', 'Ropczyce'], ['John Smith', 'kardiolog', 'Boston']];
  }


 ngOnInit(): void {
        this.appService.getQuery()
            .subscribe(kroliczki => this.doctors = kroliczki,
             error => this.errorMessage = <any>error);
  }

  onSelect(doctor: any): void {
      if (doctor === this.selectedDoctor){
        this.selectedDoctor = null;
      }
      else {
        this.selectedDoctor = doctor;
      }
    }
  }









