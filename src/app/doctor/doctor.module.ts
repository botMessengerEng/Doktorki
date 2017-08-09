import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DoctorComponent } from 'app/doctor/doctor.component';
import { DoctorService } from 'app/doctor/doctor.service';
import { AppService } from 'app/app.service';
import { DoctorEditComponent } from './doctor-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DoctorComponent,
    DoctorEditComponent
  ],

  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      { path: 'doctor/:login', component: DoctorComponent },
      { path: 'doctor/:login/edit', component: DoctorEditComponent }
    ])
  ],

  providers: [DoctorService],

})
export class DoctorModule { }