import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "app/shared/shared.module";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { ScheduleComponent } from "app/schedule/schedule.component";
import { CalendarComponent } from "app/schedule/calendar.component";
import { AppointmentsDetailsComponent } from "app/schedule/appointments-details.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ScheduleComponent,
        CalendarComponent,
        AppointmentsDetailsComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
    ],
    exports: [
        ScheduleComponent,
        CalendarComponent,
        AppointmentsDetailsComponent
    ],
    providers: [],
})
export class ScheduleModule {}