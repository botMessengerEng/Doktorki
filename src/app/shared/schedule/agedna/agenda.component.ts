import { Component, OnInit, Input } from '@angular/core';

import { Calendar } from '../../classes/calendar';
import { ScheduleService } from '../schedule.service';
import { AppService } from 'app/app.service';

@Component({
    selector: 'app-agenda',
    templateUrl: 'agenda.component.html',
    styleUrls: ['agenda.component.css']
})
export class AgendaComponent implements OnInit {
    dayOfWeek: any;
    daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    appointmentsArray = new Array();
    minutes = ['00', '15', '30', '45'];
    hours = [];
    date: Date;
    currentDate= new Date();
appointments:any;

    constructor(private scheduleService: ScheduleService, private appService: AppService) {
        for (let i = 6; i < 22; i++) {
            this.hours[i - 6] = i;
        }

    }

    ngOnInit() {
        this.appService.getVisits({login: "Brooke", date: {month: 8, day:30, year:2017, hour:"12:15"}}).subscribe(appointments => this.appointments=appointments);

        this.date=this.scheduleService.date;

        //  setTimeout(() => this.appointmentHoursGenerator(), 0);
         this.dayOfWeek = this.currentDate.getDay()
    }

    // appointmentHoursGenerator() {
    //     for (let i = 0; i < this.appointments.length; i++) {
    //         this.appointmentsArray[i] = this.appointments[i].date.hour;
    //     }

    // }
    setButtons(i:any, m: string) {
        // if (i<10) {
        //     i='0'+i;
        // }
        // let hour = i + ':' + m;
        // let transformedHour = parseInt(i + m);
        // var re = /:/gi;
        // let transformedStartHour = parseInt(this.doctor.workingHours[(this.daysArray[this.dayOfWeek == 0 ? 6 : this.dayOfWeek - 1]).toString()].start.replace(re, ""));
        // let transformedEndHour = parseInt(this.doctor.workingHours[(this.daysArray[this.dayOfWeek == 0 ? 6 : this.dayOfWeek - 1]).toString()].end.replace(re, ""));


        // if (this.appointments != undefined && this.appointmentsArray != undefined) {
        //     let styles;
        //     if (transformedHour < transformedStartHour || transformedHour >= transformedEndHour || (!transformedEndHour && !transformedStartHour)) {
        //         return {
        //             'background-color': '#fafafa',
        //         };
        //     }

        //     else if (this.appointmentsArray.find((element) => hour == element)) {
        //         return { 'background-color': '#ffcccc' };
        //     }

        //     else {
        //         return { 'background-color': '#e6ffe6' };
        //     }
        // }
    }

    setInactiveHours(i: number, m: string) {
    //     let hour = i + ':' + m;
    //     let transformedHour = parseInt(i + m);
    //     var re = /:/gi;
    //     let transformedStartHour = parseInt(this.doctor.workingHours[(this.daysArray[this.dayOfWeek == 0 ? 6 : this.dayOfWeek - 1]).toString()].start.replace(re, ""));
    //     let transformedEndHour = parseInt(this.doctor.workingHours[(this.daysArray[this.dayOfWeek == 0 ? 6 : this.dayOfWeek - 1]).toString()].end.replace(re, ""));


    //     if (this.appointments != undefined && this.appointmentsArray != undefined) {
    //         let styles;
    //         if (transformedHour < transformedStartHour || transformedHour >= transformedEndHour || (!transformedEndHour && !transformedStartHour)) {
    //             return {
    //                 'color': '#d9d9d9',
    //                 'text-decoration': 'none',
    //                 'pointer-events': 'none'
    //             };
    //         }
    //         else{
    //             return {
    //                 'color': '#002e4d',
    //                 'text-decoration': 'none'
    //             };
    //         }
    //     }
     }
}
