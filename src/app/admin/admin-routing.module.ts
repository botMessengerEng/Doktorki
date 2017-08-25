import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';
import { UsersListComponent } from 'app/admin/users-list.component/users-list.component';

const routes: Routes = [
    { path: 'admin/users-list', component: UsersListComponent },
    { path: 'admin/add-user', component: ManageUserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
