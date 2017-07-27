import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PatientComponent } from 'app/patient/patient.component';
import { PatientService } from 'app/patient/patient.service';



@NgModule({
  declarations: [
    PatientComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      { path: 'patient', component: PatientComponent },
    ])
  ],

  providers: [PatientService],

})
export class PatientModule { }