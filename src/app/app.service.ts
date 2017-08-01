import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()

export class AppService {
    private _dataBaseUrl = 'http://localhost:3000/users-details';
    constructor (private _http: Http) {}

    getQuery(): Observable<string> {
        return this._http.get(this._dataBaseUrl)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }


    // getSingleElementQuery(_dataBaseUrl2): Observable<string> {
    //     return this._http.get(_dataBaseUrl2)
    //         .map((response: Response) => response.json())
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handlerError);
    // }

    private handlerError(error: Response) {
       console.error(error);
       return Observable.throw(error.json().error || 'Server error');
    }

}

