import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MenuComponent } from 'app/shared/menu/menu.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component';

@NgModule({
    declarations: [ 
        MenuComponent,
        ManageUserComponent
    ],
    imports: [ 
        CommonModule,
        ReactiveFormsModule
     ],
    exports: [  
        MenuComponent,
        ManageUserComponent,
    ],
    providers: [],
})
export class SharedModule {}