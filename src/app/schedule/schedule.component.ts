import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css', '../shared/layout.css']
})
export class ScheduleComponent implements OnInit {
    private minutes = ['00', '15', '30', '45'];
    private hours = [];
    constructor() {
        for (let i = 6; i < 23; i++ ) {
            this.hours[i-6] = i;
        }
     }

    ngOnInit() {
     }
}