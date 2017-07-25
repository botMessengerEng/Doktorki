import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild([
       { path: 'admin', component: AdminComponent}
    ])
  ],


})
export class AdminModule { }
