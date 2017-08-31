import { Injectable } from '@angular/core';
import { CustomDate } from '../classes/custom-date';


@Injectable()

export class ScheduleService {
    currentDate= new Date();
    date = new CustomDate(this.currentDate);
}
