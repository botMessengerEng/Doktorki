import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DoctorsListComponent } from 'app/patient/doctors-list.component/doctors-list.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';


const routes: Routes = [
    { path: 'new-appointment', component: DoctorsListComponent },
    { path: 'my-profile/:login', component: ManageUserComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule {}
