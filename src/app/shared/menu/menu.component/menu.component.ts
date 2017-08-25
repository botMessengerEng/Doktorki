import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

import { AppService } from 'app/app.service';
import { MenuService } from 'app/shared/menu/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {
    url: string;
    menuContext= new Array();
    menuLinks=new Array();
    constructor(private appService: AppService, private menuService: MenuService, private router: Router) { }

    ngOnInit() {
        // setTimeout(() => this.url = this.appService.url, 0);
        this.menuContext = this.menuService.menuContext;
        this.menuLinks = this.menuService.menuLinks;
    }

}