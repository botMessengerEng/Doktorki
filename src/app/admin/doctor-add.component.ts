import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { Doctor } from '../classes/user';

@Component({
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./admin.component.css' , './doctor-add.component.css'],
})

export class DoctorAddComponent  {
    doctor: Doctor;
    submitted = false;

        constructor(private appService: AppService, private router: Router)
        {
            this.doctor = new Doctor('', '', '', '', undefined , '', '', '', '', '', '');
        }


        genders = ['male', 'female'];




  onSubmit() { this.submitted = true; }
}
















//    <div><label for="login">login: </label></div>
//                 <div><input class='input-style' type='text' [(ngModel)]="doctor.login" id='loginInput' name='login' required></div>
             
                // <div><label for="password">password: </label></div>
                // <div><input class='input-style' type='text' [(ngModel)]="doctor.password" id='passInput' name='password' required minlength="5"></div>
            
                // <div><label for="gender">gender: </label></div>
                // <select [(ngModel)]="doctor.gender" name="gender">
                //  <option *ngFor="let gen of genders" [value]="gen">{{gen}}</option>
                //  </select>

                // <div><label for="age">age: </label></div>                
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.age" name='age'></div>
               
                // <div><label for="phone">phone: </label></div>
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.phone" name='phone'></div>
                
                // <div><label for="email">email: </label></div>
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.email" name='email'></div>

                // <div><label for="street">street: </label></div>
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.street" name='street'></div>

                // <div><label for="postcode">postcode: </label></div>
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.postcode" name='postcode'></div>

                // <div><label for="city">city: </label></div>
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.city" name='city'></div>

                // <div><label for="specialization">specialization: </label></div>
                // <div> <input class='input-style' type='text' [(ngModel)]="doctor.specialization" name='specialization'></div>

//    <div *ngIf='name.errors && (name.touched || name.dirty)'>
//                 <div [hidden]="!name.errors.required">sdssd
//                 </div>
//                 <div [hidden]="!name.errors.minlength">sfsf
//                 </div>
//                 </div>

       





















   /* save() {
      document.getElementById('nameInput').setAttribute('style', 'background-color : (this.doctor.name === undefined) ? #ffc34d : #ffffff');
      //document.getElementById('loginInput').setAttribute('style', 'background-color : this.doctor.name === undefined ? "ffc34d" : "white"');
       // document.getElementById('passInput').setAttribute('style', 'background-color : this.doctor.name === undefined ? "ffc34d" : "white"');
        //  if (this.doctor.name === undefined) {
        //     document.getElementById('nameInput').setAttribute('style', 'background-color: #ffc34d');
        // }
        // if (this.doctor.name !== undefined) {
        //     document.getElementById('nameInput').setAttribute('style', 'background-color: white');
        // }


}

      

}


//   if (this.doctor.name === undefined) {
//             document.getElementById('nameInput').setAttribute('style', 'background-color: #ffc34d');
//         }
//         if (this.doctor.name !== undefined) {
//             document.getElementById('nameInput').setAttribute('style', 'background-color: white');
//         }
//         if (this.doctor.login === undefined) {
//             document.getElementById('loginInput').setAttribute('style', 'background-color: #ffc34d');
//         }
//         if (this.doctor.password === undefined) {
//             document.getElementById('passInput').setAttribute('style', 'background-color: #ffc34d');
//         }
//     }
*/