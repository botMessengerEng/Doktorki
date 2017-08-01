import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DoctorEditComponent } from './doctor-edit.component';


@NgModule({
  declarations: [
    AdminComponent,
    DoctorEditComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
       { path: 'admin', component: AdminComponent},
       { path: 'admin/edit/doctor/:name', component: DoctorEditComponent}
    ])
  ],


})
export class AdminModule { }
