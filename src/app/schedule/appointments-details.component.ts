import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Calendar } from "app/classes/calendar";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-appontments-details',
    templateUrl: './appointments-details.component.html',
    styleUrls: ['./appointments-details.component.css', '../shared/layout.css']
})

export class AppointmentsDetailsComponent implements OnInit {

    @Input() patient;
    @Input() appointment;
    appointmentForm: FormGroup;



    constructor(private fb: FormBuilder) { }


    ngOnInit(): void {
        this.appointmentForm = this.fb.group({
            day: [this.appointment.date.day, [Validators.required]],
            description: [this.appointment.patient.description, [Validators.required]]
        });
    }

}
