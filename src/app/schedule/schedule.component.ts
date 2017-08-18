import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css', '../shared/layout.css']
})
export class ScheduleComponent implements OnInit {
    @Input() doctor: any;
    @Input() appointments;
    @Input() date;
    dayOfWeek:any;
    daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    appointmentsArray = new Array();
    private minutes = ['00', '15', '30', '45'];
    private hours = [];

    constructor(private appService: AppService) {
        for (let i = 6; i < 23; i++) {
            this.hours[i - 6] = i;
        }

    }

    ngOnInit() {
        setTimeout(() => this.appointmentHoursGenerator(), 0);
         this.dayOfWeek=this.date.getDay()
         console.log(this.date.getDay());
        }

    appointmentHoursGenerator() {
        for (let i = 0; i < this.appointments.length; i++) {
            this.appointmentsArray[i] = this.appointments[i].date.hour;
        }

    }
    setButtons(i: number, m: string) {
        let hour = i + ':' + m;
        let transformedHour = parseInt(i + m);
        var re = /:/gi;
        let transformedStartHour = parseInt(this.doctor.workingHours[(this.daysArray[this.dayOfWeek==0 ? 6 : this.dayOfWeek-1]).toString()].start.replace(re, ""));
        let transformedEndHour = parseInt(this.doctor.workingHours[(this.daysArray[this.dayOfWeek==0 ? 6 : this.dayOfWeek-1]).toString()].end.replace(re, ""));


        if (this.appointments != undefined && this.appointmentsArray != undefined) {
            let styles;
            if (transformedHour < transformedStartHour || transformedHour >= transformedEndHour || (!transformedEndHour && !transformedStartHour)) {
                return { 'background-color': '#fafafa',
                          'color': '#d9d9d9' };
            }

            else if (this.appointmentsArray.find((element) => hour == element)) {
                return { 'background-color': '#ffcccc' };
            }

            else {
                return { 'background-color': '#e6ffe6' };
            }
        }
    }


}
