import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()

export class AppService {
    private _dataBaseUrlUserDetails = 'http://localhost:3000/user-details';
    private _dataBaseUrlSchedule = 'http://localhost:3000/schedule';
    url: string;
    constructor(private _http: Http) {
        this.url = "";
    }
 
    getUsers(param?): Observable<string> {
        return this._http.get(param ? this._dataBaseUrlUserDetails + '/' + param : this._dataBaseUrlUserDetails)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    // getDoctorDetails(param): Observable<string> {
    //     return this._http.post(this._dataBaseUrlDoctorDetails, param)
    //         .map((response: Response) => response.json())
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handlerError);
    // }

    // updatePatient(param): Observable<string> {
    //     return this._http.put(this._dataBaseUrlPatientDetails, param)
    //         .map((response: Response) => response.json())
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handlerError);
    // }

    // findVisits(param, params?): Observable<string> {
    //     return this._http.post(params ? this._dataBaseUrlSchedule + '/' + params : this._dataBaseUrlSchedule, param)
    //         .map((response: Response) => response.json())
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handlerError);
    // }

    private handlerError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
     }
}
