import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from 'app/register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,                        
        RouterModule.forChild([
             { path: 'register', component: RegisterComponent }
        ])
     ],

})
export class RegisterModule {}