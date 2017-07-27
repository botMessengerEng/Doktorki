import { Component, Input, HostListener } from '@angular/core';
import { USER } from 'app/login/login.component';

@Component({
    templateUrl:    'doctor.component.html',
    styleUrls:      [ 'doctor.component.css']
})

export class DoctorComponent {
    
    constructor(){console.log(USER)
    }

    over(){
    console.log("Mouseover called");
  }
}