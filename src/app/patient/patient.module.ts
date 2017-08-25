import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { DoctorsListComponent } from 'app/patient/doctors-list.component/doctors-list.component';
import { PatientRoutingModule } from 'app/patient/patient-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        DoctorsListComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        FormsModule,
        NgxPaginationModule,
        PatientRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [],
})
export class PatientModule {}