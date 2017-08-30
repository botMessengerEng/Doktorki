import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MenuComponent } from 'app/shared/menu/menu.component/menu.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { NameFilterPipe } from 'app/shared/pipes/name-filter.pipe';
import { DoctorFilter } from 'app/shared/pipes/doctor-filter.pipe';
import { PatientFilter } from 'app/shared/pipes/patient-filter.pipe';
import { CalendarComponent } from 'app/shared/schedule/calendar/calendar.component';
import { ScheduleComponent } from 'app/shared/schedule/schedule-component/schedule.component';
import { ScheduleService } from 'app/shared/schedule/schedule.service';
import { AgendaComponent } from 'app/shared/schedule/agedna/agenda.component';

@NgModule({
    declarations: [
        MenuComponent,
        ManageUserComponent,
        NameFilterPipe,
        DoctorFilter,
        PatientFilter,
        ScheduleComponent,
        CalendarComponent,
        AgendaComponent
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
     ],
    exports: [
        MenuComponent,
        ManageUserComponent,
        NameFilterPipe,
        DoctorFilter,
        PatientFilter,
        CalendarComponent,
        ScheduleComponent,
        AgendaComponent
    ],
    providers: [ ScheduleService ],
})
export class SharedModule {}
