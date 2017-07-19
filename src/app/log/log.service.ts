import { User } from '../classes/user';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()

export class LogService {
    private _dataBaseUrl = '../server/users.json';
    constructor (private _http: Http) {}

    getUsers(): Observable<User[]> {
        return this._http.get(this._dataBaseUrl)
            .map((response: Response) => <User[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
       console.error(error);
       return Observable.throw(error.json().error || 'Server error');
    }

}
