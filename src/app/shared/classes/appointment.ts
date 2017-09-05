export class Appointment {
    _id=""
    login="";

    patient = {
        login: "",
        description: ""
    }

    date = {
        year: 0,
        month: 0,
        day: 0,
        hour: ""
    }

    constructor() {
    }

    setAppointmentDetails(appt) {
        this._id=appt._id;
        this.login = appt.login;
        this.patient.login = appt.patient.login;
        this.patient.description = appt.patient.description;
        this.date.year = appt.date.year;
        this.date.month = appt.date.month;
        this.date.day = appt.date.day;
        this.date.hour = appt.date.hour;
    }

    setNewAppointment(doctor, date){
        this.login=doctor.login;
        this.date.year = date.date.year;
        this.date.month = date.date.month;
        this.date.day = date.date.day;
        this.date.hour = date.date.hour;
    }

}