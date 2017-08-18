import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "app/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { ScheduleComponent } from "app/schedule/schedule.component";
import { CalendarComponent } from "app/schedule/calendar.component";

@NgModule({
    declarations: [
        ScheduleComponent,
        CalendarComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        HttpModule,
    ],
    exports: [
        ScheduleComponent,
        CalendarComponent
    ],
    providers: [],
})
export class ScheduleModule {}