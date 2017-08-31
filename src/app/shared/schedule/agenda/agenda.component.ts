import { Component, OnInit, Input, DoCheck } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/toPromise';

import { Calendar } from '../../classes/calendar';
import { ScheduleService } from '../schedule.service';
import { AppService } from 'app/app.service';
import { CustomDate } from 'app/shared/classes/custom-date';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-agenda',
    templateUrl: 'agenda.component.html',
    styleUrls: ['agenda.component.css']
})
export class AgendaComponent implements OnInit, DoCheck {
    dayOfWeek: any;
    daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    allAppointments = new Array();
    hoursOfDailyAppointments = new Array();
    minutes = ['00', '15', '30', '45'];
    hours = [];
    date: Date;
    currentDate = new Date();
    dailyAppointments: any;
    doctor: any;
    canView = false;
    dateTmp = new CustomDate(this.currentDate);
    // rerender = false;

    constructor(private scheduleService: ScheduleService, private appService: AppService, private authService: AuthService) {
        for (let i = 6; i < 22; i++) {
            this.hours[i - 6] = i;
        }

    }

    ngOnInit() {
        Promise.all([
            this.getVisits(),
            this.getUserDetails()
        ])
            .then(() => this.dayOfWeek = this.getdayOfWeek())
            .then(() => this.appointmentHoursGenerator())
            .then(() => this.canView = true);
    }
 
    private getVisits() {
        return this.appService.getVisits({
            // login: this.authService.user.login,
            login: "Brooke",
            date: {
                year: this.currentDate.getFullYear(),
                month: this.currentDate.getMonth() + 1,
                day: this.currentDate.getDate()
            }
        })
            .toPromise().then(appointments => this.dailyAppointments = appointments)
    }

    private getUserDetails() {
        return this.appService.getUserDetails({ /*login: this.authService.user.login */ login: "Brooke"})
            .toPromise().then((user => this.doctor = user))
    }


    appointmentHoursGenerator() {
        for (let i = 0; i < this.dailyAppointments.length; i++) {
            this.hoursOfDailyAppointments[i] = this.dailyAppointments[i].date.hour;
        }

    }

    getdayOfWeek() {
        let date = new Date(this.dateTmp.year, this.dateTmp.month, this.dateTmp.day)
        return date.getDay();
        // console.log(date.getDay());
    }

    getScheduleServiceDate() {
        console.log(this.scheduleService.date.day, this.scheduleService.date.month, this.scheduleService.date.year);
        console.log(this.dateTmp.day, this.dateTmp.month, this.dateTmp.year);
        console.log(this.dateTmp);
        console.log(this.scheduleService.date);

    }

    ngDoCheck() {
        if (!_.isEqual(this.dateTmp, this.scheduleService.date)) {
            console.log('ive changed');
            this.hoursOfDailyAppointments = new Array();
            // this.rerender = !this.rerender;
            this.appService.getVisits({
                login: "Brooke",
                date: {
                    year: this.scheduleService.date.year,
                    month: (this.scheduleService.date.month + 1),
                    day: this.scheduleService.date.day
                }
            }).toPromise().then(appointments => this.dailyAppointments = appointments)
                .then(() => this.dayOfWeek = this.getdayOfWeek())
                .then(() => this.appointmentHoursGenerator())
                .then(() => {
                    // this.rerender = !this.rerender;
                    Object.assign(this.dateTmp, this.scheduleService.date);

                });
        }
    }

    setButtons(i: any, m: string) {
        if (i < 10) {
            i = '0' + i;
        }
        let hour = i + ':' + m;
        let transformedHour = parseInt(i + m);
        var re = /:/gi;
        let transformedStartHour = parseInt(this.doctor[0].workingHours[(this.daysArray[this.dayOfWeek == 0 ? 6 : this.dayOfWeek - 1]).toString()].start.replace(re, ""));
        let transformedEndHour = parseInt(this.doctor[0].workingHours[(this.daysArray[this.dayOfWeek == 0 ? 6 : this.dayOfWeek - 1]).toString()].end.replace(re, ""));


        if (this.dailyAppointments != undefined && this.hoursOfDailyAppointments != undefined) {
            let styles;
            if (transformedHour < transformedStartHour || transformedHour >= transformedEndHour || (!transformedEndHour && !transformedStartHour)) {
                return {
                    'background-color': 'white',
                };
            }

            else if (this.hoursOfDailyAppointments.find((element) => hour == element)) {
                return { 'background-color': '#660000' };
            }

            else {
                return { 'background-color': '#006640' };
            }
        }
    }


    sprawdz() {
        console.log(_.isEqual(this.scheduleService.date, this.dateTmp));
    }

}
