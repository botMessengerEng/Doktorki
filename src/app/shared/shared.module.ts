import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PatientAddFormComponent } from './patient-add-form.component';
import { DoctorEditFormComponent } from './doctor-edit-form.component';
import { PatientEditFormComponent } from './patient-edit-form.component';
import { NameFilterPipe } from './name-filter.pipe';


@NgModule({
  declarations: [
      PatientAddFormComponent,
      DoctorEditFormComponent,
      PatientEditFormComponent,
      NameFilterPipe
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],

    exports: [
      PatientAddFormComponent,
      DoctorEditFormComponent,
      PatientEditFormComponent,
      NameFilterPipe
    ]


})
export class SharedModule { }
