import { Component } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  doctorId1 = false;
  doctors: any;

  constructor(){
    this.doctors = [['Hannah Baker', 'od uchów', 'Ropczyce'], ['John Smith', 'kardiolog', 'Boston']];

  }

  toggleButton(){
    this.doctorId1 = !this.doctorId1;
    console.log(this.doctorId1);
  }

  setButtonStyles(){
    let styles = {
      'background-color': this.doctorId1 ? '#ffcc00'  : '#003d66',
    };
    return styles;
  }

  setBorderStyles(){
    let styles = {
      'border-color': this.doctorId1 ? '#ffcc00'  : '#003d66',
      'background-color': this.doctorId1 ? '#ffcc00'  : '#003d66',
    };
    return styles;
  }

}









/*
<div class='container'>
<div class='logo'>Admin's Profile</div>
<div class='content'>
    List of Doctors:<br><br>

    <div class='doctors-panel'><div class='doctor-panel'>
<button class='doctor-button' (click)='toggleButton()'  >
    <div class='button-divided'>
       Hannah Baker
    </div>
    <div class='button-divided'>
        od ucha
    </div>
    <div class='button-divided'>
        Ropczyce
    </div>
</button>
<div class="shortDetails" *ngIf='doctorId1' >
    coś
</div></div>
</div>
</div>
</div>*/