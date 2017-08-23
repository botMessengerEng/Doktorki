import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [
        LoginComponent,
        AddUserComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [AuthService],
})
export class AuthModule {}