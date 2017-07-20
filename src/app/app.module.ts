import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { LogService } from "./log/log.service";

@NgModule({
  declarations: [
    AppComponent,
    LogComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],

  providers: [ LogService ],

  bootstrap: [LogComponent]
})
export class AppModule { }
