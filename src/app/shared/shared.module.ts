import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PatientAddFormComponent } from './patient-add-form.component';
import { DoctorEditFormComponent } from './doctor-edit-form.component';

@NgModule({
  declarations: [
      PatientAddFormComponent,
      DoctorEditFormComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  

    exports: [
      PatientAddFormComponent,
      DoctorEditFormComponent
    ]



})
export class SharedModule { }
