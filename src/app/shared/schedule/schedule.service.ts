import { Injectable } from '@angular/core';
import { CustomDate } from '../classes/custom-date';
import * as _ from 'lodash';


@Injectable()

export class ScheduleService {
    doctor;
    patient;

    // array of all appointments
    allAppointments;
    // arrays of appointments of selected day and of hours of that appts
    dailyAppointments;
    dailyAppointmentsHours;
    // single appointment which we selected and selected day of week
    selectedAppointment;
    selectedDayOfWeek;

    date = new CustomDate(new Date());


    apptsToArray(data) {
        let array = new Array();
        for (let i = 0; i < data.length; i++) {
            array[i] = data[i].date.hour;
        }
        return array;
    }

    getDailyAppts() {
        let array=new Array();
        for (let i=0; i < this.allAppointments.length; i++) {
            if (_.isEqual(this.allAppointments[i].date,{
                year: this.date.year,
                month: (this.date.month +1),
                day: this.date.day,
                hour:  this.allAppointments[i].date.hour // ojej!
            })) {
                array.push(this.allAppointments[i]);
            }
        }
        return new Promise(resolve => resolve(array));
    }


}
