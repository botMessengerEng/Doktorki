import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from 'app/admin/admin-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { UsersListComponent } from 'app/admin/users-list.component/users-list.component';

@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [ 
        CommonModule,
        NgxPaginationModule,
        FormsModule,
        AdminRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [],
})
export class AdminModule {}