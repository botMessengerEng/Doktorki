import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Calendar } from "app/classes/calendar";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { dayMonthCheck } from '../shared/day-month-check.directives';
import { DataArrays } from "app/classes/data-arrays";

@Component({
    selector: 'app-appontments-details',
    templateUrl: './appointments-details.component.html',
    styleUrls: ['./appointments-details.component.css', '../shared/layout.css', '../shared/forms-style.css']
})

export class AppointmentsDetailsComponent implements OnInit {

    @Input() patient;
    @Input() appointment;
    appointmentForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    invalid= false;
    errMessage: any;
    genders = ['male', 'female'];
    dataArrays = new DataArrays;
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.dataArrays.daysGenerator();
        this.dataArrays.yearsFutureGenerator();
        this.dataArrays.hoursGenerator()
        this.appointmentForm = this.fb.group({
            description: [this.appointment.patient.description],
            dayMonthGroup: this.fb.group({
                month: [this.dataArrays.monthsArray[this.appointment.date.month - 1], [Validators.required]],
                day: [this.appointment.date.day, [Validators.required]],
                year: [this.appointment.date.year, [Validators.required]]
            }, { validator: dayMonthCheck }),
            hour: [this.appointment.date.hour, [Validators.required]],
        });
    }


    onSubmit(){
     if(this.dataArrays.monthsArray[this.dataArrays.date.getMonth()]==this.appointmentForm.get('dayMonthGroup.month').value 
        && this.dataArrays.date.getDate()>this.appointmentForm.get('dayMonthGroup.day').value 
        &&  this.dataArrays.date.getFullYear()==this.appointmentForm.get('dayMonthGroup.year').value)
     {
         this.invalid=true;
     }
    }

}
