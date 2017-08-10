import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PatientComponent } from 'app/patient/patient.component';
import { PatientEditComponent } from 'app/patient/patient-edit.component';
import { PatientService } from 'app/patient/patient.service';
import { AppService } from 'app/app.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PatientComponent, 
    PatientEditComponent  
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'patient/:login', component: PatientComponent },
      { path: 'patient/:login/edit', component: PatientEditComponent },
    ])
  ],

  providers: [PatientService],

})
export class PatientModule { }