import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from 'app/app.service';
import { Calendar } from '../../classes/calendar';
import { dayMonthCheck } from '../../manage-user/day-month-check.directives';
import { DateArrays } from '../../classes/date-arrays';
import { AppointmentTerm } from '../../classes/appointment-term';

@Component({
    selector: 'app-appontment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.css']
})

export class AppointmentDetailsComponent implements OnInit {
    doctor;
    patient;
    appointments;
    allAppointments;
    singleAppointment;
    appointmentForm: FormGroup;
    yearsArray = new Array(107);
    daysArray = new Array(31);
    invalid = false;
    appointmentTerm;
    errMessage: any;
    genders = ['male', 'female'];
    dateArrays = new DateArrays;

    constructor(private fb: FormBuilder, private appService: AppService) {
        this.appointmentTerm = new AppointmentTerm(undefined, '', undefined, '');
    }

    ngOnInit() {
        



        // this.dateArrays.daysGenerator();
        // this.dateArrays.yearsFutureGenerator();
        // this.dateArrays.hoursGenerator()
        this.appointmentForm = this.fb.group({
            // description: [this.singleAppointment.patient.description],
            // dayMonthGroup: this.fb.group({
            //     month: [this.dateArrays.monthsArray[this.singleAppointment.date.month - 1], [Validators.required]],
            //     day: [this.singleAppointment.date.day, [Validators.required]],
            //     year: [this.singleAppointment.date.year, [Validators.required]]
            // }, { validator: dayMonthCheck }),
            // hour: [this.singleAppointment.date.hour, [Validators.required]],
        });

        // this.appointmentForm.get('dayMonthGroup.day').valueChanges.subscribe(value => this.appointmentTerm.day = this.appointmentForm.get('dayMonthGroup.day').value);
        // this.appointmentForm.get('dayMonthGroup.month').valueChanges.subscribe(value => this.appointmentTerm.month = this.appointmentForm.get('dayMonthGroup.month').value);
        // this.appointmentForm.get('dayMonthGroup.year').valueChanges.subscribe(value => this.appointmentTerm.year = this.appointmentForm.get('dayMonthGroup.year').value);
        // this.appointmentForm.get('hour').valueChanges.subscribe(value => this.appointmentTerm.day = this.appointmentForm.get('hour').value);
        // this.appointmentForm.get('description').valueChanges.subscribe(value => this.appointmentTerm.day = this.appointmentForm.get('description').value);

    }

    // checkIfTermIsValid() {
    //     const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    //     const d = new Date(
    //         this.appointmentForm.get('dayMonthGroup.year').value,
    //         (this.dateArrays.monthsArray.indexOf(this.appointmentForm.get('dayMonthGroup.month').value)),
    //         this.appointmentForm.get('dayMonthGroup.day').value);


    //     try {

    //         const app = this.allAppointments.find(element => element.login == this.doctor.login &&
    //             element.date.year == d.getFullYear() &&
    //             element.date.month == d.getMonth() + 1 &&
    //             element.date.day == d.getDate() &&
    //             element.date.hour == this.appointmentForm.get('hour').value);
    //         console.log(app);

    //         if (this.doctor.workingHours[days[d.getDay()]].start > this.appointmentForm.get('hour').value ||
    //             this.doctor.workingHours[days[d.getDay()]].end < this.appointmentForm.get('hour').value) {
    //             return true;
    //         }
    //         else if (app) {
    //             console.log('asdadadadasd');
    //             return true;
    //         }
    //         else {
    //             return false;
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }

    // }

    // onSubmit() {
    //     if ((this.dateArrays.monthsArray[this.dateArrays.date.getMonth()] == this.appointmentForm.get('dayMonthGroup.month').value
    //         && this.dateArrays.date.getDate() > this.appointmentForm.get('dayMonthGroup.day').value
    //         && this.dateArrays.date.getFullYear() == this.appointmentForm.get('dayMonthGroup.year').value)

    //         || ((this.dateArrays.date.getMonth() + 1) > (this.dateArrays.monthsArray.indexOf(this.appointmentForm.get('dayMonthGroup.month').value) + 1) && this.dateArrays.date.getFullYear() == this.appointmentForm.get('dayMonthGroup.year').value)) {
    //         this.invalid = true;
    //     }
    //     else if (this.checkIfTermIsValid()) {
    //         console.log("imhere");
    //         this.invalid = true;
    //     }
    //     else {
    //         console.log('jestem w else');

    //     }
    // }


}
