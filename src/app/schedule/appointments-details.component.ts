import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Calendar } from "app/classes/calendar";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { dayMonthCheck } from '../shared/day-month-check.directives';
import { DataArrays } from "app/classes/data-arrays";
import { AppointmentTerm } from '../classes/appointment-term';

@Component({
    selector: 'app-appontments-details',
    templateUrl: './appointments-details.component.html',
    styleUrls: ['./appointments-details.component.css', '../shared/layout.css', '../shared/forms-style.css']
})

export class AppointmentsDetailsComponent implements OnInit {
    @Input() doctor;
    @Input() patient;
    @Input() appointments;
    @Input() singleAppointment;
    appointmentForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    invalid= false;
    appointmentTerm;
    errMessage: any;
    genders = ['male', 'female'];
    dataArrays = new DataArrays;

    constructor(private fb: FormBuilder) { 
        this.appointmentTerm = new AppointmentTerm(undefined, '', undefined, '');
    }

    ngOnInit() {
        this.dataArrays.daysGenerator();
        this.dataArrays.yearsFutureGenerator();
        this.dataArrays.hoursGenerator()
        this.appointmentForm = this.fb.group({
            description: [this.singleAppointment.patient.description],
            dayMonthGroup: this.fb.group({
                month: [this.dataArrays.monthsArray[this.singleAppointment.date.month - 1], [Validators.required]],
                day: [this.singleAppointment.date.day, [Validators.required]],
                year: [this.singleAppointment.date.year, [Validators.required]]
            }, { validator: dayMonthCheck }),
            hour: [this.singleAppointment.date.hour, [Validators.required]],
        });


    this.appointmentForm.get('dayMonthGroup.day').valueChanges.subscribe(value => this.appointmentTerm.day = this.appointmentForm.get('dayMonthGroup.day').value);
     this.appointmentForm.get('dayMonthGroup.month').valueChanges.subscribe(value => this.appointmentTerm.month = this.appointmentForm.get('dayMonthGroup.month').value);
    this.appointmentForm.get('dayMonthGroup.year').valueChanges.subscribe(value => this.appointmentTerm.year = this.appointmentForm.get('dayMonthGroup.year').value);
    this.appointmentForm.get('hour').valueChanges.subscribe(value => this.appointmentTerm.day = this.appointmentForm.get('hour').value);
    this.appointmentForm.get('description').valueChanges.subscribe(value => this.appointmentTerm.day = this.appointmentForm.get('description').value);

}

    checkIfTermIsValid(){
      
    }

    onSubmit(){
     if((this.dataArrays.monthsArray[this.dataArrays.date.getMonth()]==this.appointmentForm.get('dayMonthGroup.month').value 
        && this.dataArrays.date.getDate()>this.appointmentForm.get('dayMonthGroup.day').value 
        &&  this.dataArrays.date.getFullYear()==this.appointmentForm.get('dayMonthGroup.year').value)

        || ((this.dataArrays.date.getMonth()+1) > (this.dataArrays.monthsArray.indexOf(this.appointmentForm.get('dayMonthGroup.month').value) +1) && this.dataArrays.date.getFullYear()==this.appointmentForm.get('dayMonthGroup.year').value))
     {
         this.invalid=true;
     }
    }


}
