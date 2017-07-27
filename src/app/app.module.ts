import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AdminModule } from 'app/admin/admin.module';
import { PatientModule } from 'app/patient/patient.module';
import { DoctorModule } from 'app/doctor/doctor.module';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]),
    LoginModule,
    AdminModule,
    PatientModule,
    DoctorModule
  ],

  providers: [  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
