import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DoctorsManageComponent } from './doctors-manage.component';
import { DoctorEditComponent } from './doctor-edit.component';
import { DoctorAddComponent } from './doctor-add.component';
import { PatientAddComponent } from './patient-add.component';
import { SharedModule } from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    DoctorsManageComponent,
    DoctorEditComponent,
    DoctorAddComponent,
    PatientAddComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild([
       { path: 'admin/manage/doctors', component: DoctorsManageComponent},
       { path: 'admin/edit/doctor/:login', component: DoctorEditComponent},
       { path: 'admin/add/doctor', component: DoctorAddComponent},
       { path: 'admin/add/patient', component: PatientAddComponent}
    ])
  ],


})
export class AdminModule { }
