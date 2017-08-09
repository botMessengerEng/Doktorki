import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';


@Component({
    template: `<div class='container'>
                    <nav class='menu'>
                     <div> Doktorki </div>
                     <div> <a routerLink="/admin/add/doctor">add doctor</a> </div>
                     <div><a routerLink="/admin/manage/doctors">manage doctors</a> </div>
                     <div> <a routerLink="/admin/add/patient" class='set'>add patient</a> </div>
                     <div> <a routerLink="/login">manage patients</a> </div>
                     <div><a routerLink="/login">log out</a> </div>
                    </nav>
                    <app-patient-add-form [admin]="true"></app-patient-add-form>
                </div>`,

    styleUrls: ['./admin-style.css'],
})

export class PatientAddComponent {
}
