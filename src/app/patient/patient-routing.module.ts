import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DoctorsListComponent } from 'app/patient/doctors-list.component/doctors-list.component';


const routes: Routes = [
    { path: 'new-appointment', component: DoctorsListComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule {}
