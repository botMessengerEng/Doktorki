import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css', '../shared/layout.css']
})


export class CalendarComponent {
    @Input() login: any;
    days = new Array();  
    date= new Date();
    today: any;
    monthNumber: any;
    monthName: any;
    year:any;
    monthArray= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December']
    
    constructor(private router: Router,
    private appService: AppService,
    private route: ActivatedRoute) 
    {
        this.days[0]=31;
        for (let i = 1; i < 32; i++ ) {
            this.days[i] = i;
        }
        this.days[32]=1;
        this.days[33]=2;
        this.days[34]=3;

        this.today=this.date.getDate();
        this.monthName=this.monthArray[this.date.getMonth()];
        this.monthNumber=this.date.getMonth()+1 ;
        this.year=this.date.getFullYear();
     }
}