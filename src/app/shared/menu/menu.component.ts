import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {
    url: string;

    constructor(private appService: AppService) { }

    ngOnInit() {
        setTimeout(() => this.url = this.appService.url, 0);
    }

}