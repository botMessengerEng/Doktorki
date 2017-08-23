import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
    private _dataBaseUrlRegister = 'http://localhost:3000/register';
    url: string;
    constructor(private _http: Http) {
        this.url = "";
    }

    addPatient(param): Observable<string> {
        return this._http.post(this._dataBaseUrlRegister, param)
            .map((response: Response) => response.json())
            .do(data => console.log('New patient added: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    
    private handlerError(error: Response) {
       console.error(error);
       return Observable.throw(error.json().error || 'Server error');
    }


}