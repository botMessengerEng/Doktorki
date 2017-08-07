import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck } from '@angular/core';

import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { Patient } from '../classes/user';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['../admin/admin.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit, DoCheck {

    yearsArray = new Array(107);
    daysArray = new Array(31);
    monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']

    errMessage: any;
    @Input()
    patient: Patient;
    genders = ['male', 'female'];
    constructor(private appService: AppService, private router: Router) {
        this.patient = new Patient('', '', '', '', '', undefined, '', '', undefined, undefined, undefined, '');
    }

    ngOnInit() {
        this.yearsGenerator();
        this.daysGenerator();
    }

ngDoCheck() {
   if(this.patient.dateOfBirth.month==='February') {
      for (let i = 0; i <= 28; i++) {
                this.daysArray[i] = i + 1;
           }
   }
}
    // ngOnChanges(changes: SimpleChanges): void {
    //     console.log(changes);
    //     if(this.patient.dateOfBirth.month==='February'){
    //         for (let i = 0; i <= 28; i++) {
    //             this.daysArray[i] = i + 1;
    //         }
    //     }
        
    // }

    onSubmit(user) {
        this.appService.addNewUser(user)
            .subscribe((result) => {
                if (result === 'OK')
                    this.back();
                else
                    alert('login zajety');
            }
            , err => this.errMessage = err)
    }

    back() {
        this.router.navigate(['login']);
    }

    yearsGenerator() {
        for (let i = 0; i <= 107; i++) {
            this.yearsArray[i] = 1910 + i;
        }
    }

    daysGenerator() {
        if (this.patient.dateOfBirth.month === 'February') {
            for (let i = 0; i <= 28; i++) {
                this.daysArray[i] = i + 1;
            }
        }

        else {
            for (let i = 0; i <= 30; i++) {
                this.daysArray[i] = i + 1;
            }
        }
    }

}
