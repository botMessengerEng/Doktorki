
import { User } from '../classes/user';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()

export class LogService {
    private _dataBaseUrl = 'http://localhost:3000/log';
    constructor (private _http: Http) {}

    postQuery(message: any): Observable<string> {
        return this._http.post(this._dataBaseUrl, message)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
       console.error(error);
       return Observable.throw(error.json().error || 'Server error');
    }

}

