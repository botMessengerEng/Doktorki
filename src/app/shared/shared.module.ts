import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MenuComponent } from 'app/shared/menu/menu.component/menu.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { MenuService } from 'app/shared/menu/menu.service';
import { NameFilterPipe } from 'app/shared/pipes/name-filter.pipe';
import { DoctorFilter } from 'app/shared/pipes/doctor-filter.pipe';
import { PatientFilter } from 'app/shared/pipes/patient-filter.pipe';

@NgModule({
    declarations: [
        MenuComponent,
        ManageUserComponent,
        NameFilterPipe,
        DoctorFilter,
        PatientFilter
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        RouterModule
     ],
    exports: [
        MenuComponent,
        ManageUserComponent,
        NameFilterPipe,
        DoctorFilter,
        PatientFilter
    ],
    providers: [ MenuService ],
})
export class SharedModule {}
