import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DoctorEditComponent } from './doctor-edit.component';
import { DoctorAddComponent } from './doctor-add.component';


@NgModule({
  declarations: [
    AdminComponent,
    DoctorEditComponent,
    DoctorAddComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
       { path: 'admin', component: AdminComponent},
       { path: 'admin/edit/doctor/:login', component: DoctorEditComponent},
       { path: 'admin/add/doctor', component: DoctorAddComponent}
    ])
  ],


})
export class AdminModule { }
