import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DoctorComponent } from 'app/doctor/doctor.component';
import { DoctorService } from 'app/doctor/doctor.service';
import { AppService } from 'app/app.service';



@NgModule({
  declarations: [
    DoctorComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      { path: 'doctor', component: DoctorComponent },
    ])
  ],

  providers: [DoctorService],

})
export class DoctorModule { }