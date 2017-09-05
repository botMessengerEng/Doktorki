import { Component, OnInit, Input, DoCheck } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/toPromise';

import { Calendar } from '../../classes/calendar';
import { Appointment } from '../../classes/appointment';
import { ScheduleService } from '../schedule.service';
import { AppService } from 'app/app.service';
import { CustomDate } from 'app/shared/classes/custom-date';
import { AuthService } from 'app/auth/auth.service';
import { DateArrays } from 'app/shared/classes/date-arrays';

@Component({
    selector: 'app-agenda',
    templateUrl: 'agenda.component.html',
    styleUrls: ['agenda.component.css']
})
export class AgendaComponent implements OnInit, DoCheck {
    daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    minutes = ['00', '15', '30', '45'];
    hours = [];
    canView = false;
    dateTmp = new CustomDate(new Date());
    dateArrays = new DateArrays();
    
    constructor(private scheduleService: ScheduleService, private appService: AppService, private authService: AuthService) {}

    ngOnInit() {
        Promise.all([
            this.getVisits(),
            this.getUserDetails()
        ])
            .then(() => this.scheduleService.getAllApptsAndThenDailyAppts())
            .then(() => this.canView = true)
            .catch(err => {throw(err)})
    }

    private getVisits() {
        return this.scheduleService.getVisits({
            login: 'Brooke',
        }, '0')
            .toPromise().then(appointments => this.scheduleService.allAppointments = appointments);
    }

    private getUserDetails() {
        return this.appService.getUserDetails({ /*login: this.authService.user.login */ login: "Brooke" })
            .toPromise().then((user => this.scheduleService.doctor = user))
    }


    ngDoCheck() {
        if (!_.isEqual(this.dateTmp, this.scheduleService.date)) {
            console.log('ive changed');
            this.scheduleService.dailyAppointmentsHours = new Array();

            this.scheduleService.getDailyAppts()
                .then(result => this.scheduleService.dailyAppointments = result)
                .then(() => this.scheduleService.selectedDayOfWeek = this.scheduleService.getdayOfWeek())
                .then(() => console.log(this.scheduleService.selectedDayOfWeek))
                .then(() => this.scheduleService.dailyAppointmentsHours = this.scheduleService.apptsToArray(this.scheduleService.dailyAppointments))
                .then(() => {
                    Object.assign(this.dateTmp, this.scheduleService.date);

                });
        }
    }

    setButtons(i: any, m: string) {
        if (i < 10) {
            i = '0' + i;
        }
        const hour = i + ':' + m;
        const transformedHour = parseInt(i + m);
        const re = /:/gi;
        const transformedStartHour = parseInt(this.scheduleService.doctor[0].workingHours[(this.daysArray[this.scheduleService.selectedDayOfWeek == 0 ? 6 : this.scheduleService.selectedDayOfWeek - 1]).toString()].start.replace(re, ""));
        const transformedEndHour = parseInt(this.scheduleService.doctor[0].workingHours[(this.daysArray[this.scheduleService.selectedDayOfWeek == 0 ? 6 : this.scheduleService.selectedDayOfWeek - 1]).toString()].end.replace(re, ""));


        if (this.scheduleService.dailyAppointments != undefined && this.scheduleService.dailyAppointmentsHours != undefined) {
            let styles;
            if (transformedHour < transformedStartHour || transformedHour >= transformedEndHour || (!transformedEndHour && !transformedStartHour)) {
                return {
                    'background-color': 'white',
                };
            }

            else if (this.scheduleService.dailyAppointmentsHours.find((element) => hour == element)) {
                return { 'background-color': '#660000' };
            }

            else {
                return { 'background-color': '#006640' };
            }
        }
    }

    selectAppointment(i: any, m: string) {
        if (i < 10) {
            i = '0' + i;
        }

        const hour = i + ':' + m;
        this.scheduleService.selectedAppointment.setAppointmentDetails(this.scheduleService.dailyAppointments.find(element => element.date.hour === hour) ? this.scheduleService.dailyAppointments.find(element => element.date.hour === hour) : new Appointment());
        
        
        if(this.scheduleService.selectedAppointment._id==""){
        this.scheduleService.selectedAppointment.setNewAppointment(this.scheduleService.doctor[0].login, this.scheduleService.selectedAppointment.date);
        }
    }

}