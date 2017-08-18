import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Calendar } from "app/classes/calendar";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css', '../shared/layout.css']
})

export class CalendarComponent {
    @Input() login: any;
    days = new Array();
    date = new Date();
    currentDay: any;
    currentMonth: any;
    currentYear: any;
    monthName: any;
    year: any;
    monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
    calendar = new Calendar();

    constructor(private router: Router,
        private appService: AppService,
        private route: ActivatedRoute) {
        this.days = this.calendar.getMonthView();
        this.currentMonth = this.date.getMonth();
        this.currentDay = this.date.getDate();
        this.currentYear = this.date.getFullYear();
        this.setYearAndMonth();
    }

    setYearAndMonth() {
        this.monthName = this.monthArray[this.calendar.month];
        this.year = this.calendar.year;
    }

    forward() {
        this.days = this.calendar.moveMonthForward();
        this.setYearAndMonth();
    }
    back() {
        this.days = this.calendar.moveMonthBack();
        this.setYearAndMonth();
    }


    setBackGroundStyle(day, i) {
        if (day === this.currentDay && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year) {
            return { "background-color": "#003d66" }
        }
        else {
            return { "background-color": "white" }
        }
    }

    setInactiveDays(day, i) {
        if (day === this.currentDay && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year) {
            return { "color": "white" }
        }
        else if ((day < this.currentDay && this.monthName == this.monthArray[this.currentMonth] && this.currentYear == this.year)
            || (day > this.currentDay && i < 6) || (day < this.currentDay && i > 29)) {
            return {
                "color": "#d9d9d9",
                "pointer-events": "none"
            }
        }
    }

}