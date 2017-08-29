import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { UsersListComponent } from 'app/admin/users-list.component/users-list.component';

const routes: Routes = [
    { path: 'users-list', component: UsersListComponent },
    { path: 'add-user', component: ManageUserComponent },
    { path: 'add-patient', component: ManageUserComponent },
    { path: 'users-list/:login', component: ManageUserComponent },
    { path: 'my-profile', component: ManageUserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
