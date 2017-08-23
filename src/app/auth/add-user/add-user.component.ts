import { Component, OnInit } from '@angular/core';
// import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../../auth/auth.service';
import { AppService } from "app/app.service";
import { ActivatedRoute } from "@angular/router";


@Component({
    templateUrl: './add-user.component.html'
    // styleUrls: ['../admin/admin-style.css', '../shared/layout.css']
})
export class AddUserComponent implements OnInit{
    url: string;

    constructor(private appService: AppService, private route: ActivatedRoute){}

    ngOnInit() {
        this.url= this.route.snapshot.url.join('');
        this.appService.url = this.url;
    }
}
