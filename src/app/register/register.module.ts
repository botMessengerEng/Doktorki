import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from 'app/register/register.component';


@NgModule({
    declarations: [
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,                        
        RouterModule.forChild([
             { path: 'register', component: RegisterComponent }
        ])
     ],

})
export class RegisterModule {}