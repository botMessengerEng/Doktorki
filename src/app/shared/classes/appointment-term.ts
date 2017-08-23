export class AppointmentTerm {
    year: number;
    month: string;
    day: number;
    hour: string;

    constructor(year,month,day,hour) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
    }

}