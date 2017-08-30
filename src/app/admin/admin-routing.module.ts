import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { UsersListComponent } from 'app/admin/users-list.component/users-list.component';
import { ScheduleComponent } from 'app/shared/schedule/schedule-component/schedule.component';

const routes: Routes = [
    { path: 'users-list', component: UsersListComponent },
    { path: 'add-user', component: ManageUserComponent },
    { path: 'add-patient', component: ManageUserComponent },
    { path: 'users-list/:login', component: ManageUserComponent },
    { path: 'my-profile', component: ManageUserComponent },
    { path: 'my-appointments', component: ScheduleComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
