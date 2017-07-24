import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
      { path: 'log', component: LoginComponent },
    ])
  ],

  providers: [LoginService],

})
export class LoginModule { }