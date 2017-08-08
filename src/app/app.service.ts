import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

// class InsertDocDto {
//     name: string;
// }

// const req: InsertDocDto = {
//     name: 'jjfdklsf'
// }

@Injectable()

export class AppService {
    private _dataBaseUrl = 'http://localhost:3000/doctor-details';
    private _dataBaseUrl2 = 'http://localhost:3000/delete-doctor';
    private _dataBaseUrl3 = 'http://localhost:3000/insert-doctor';
    private _dataBaseUrlRegister = 'http://localhost:3000/register';
    constructor (private _http: Http) {}


    getQuery(): Observable<string> {
        return this._http.get(this._dataBaseUrl)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    postQuery(param): Observable<string> {
        return this._http.post(this._dataBaseUrl, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }


    updateQuery(param): Observable<string> {
        return this._http.put(this._dataBaseUrl, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    deleteQuery(param): Observable<string> {
        return this._http.put(this._dataBaseUrl2, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }


    addNewDoctor(param): Observable<string> {
        return this._http.post(this._dataBaseUrl3, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    addNewUser(param): Observable<string> {
        return this._http.post(this._dataBaseUrlRegister, param)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handlerError);
    }

    private handlerError(error: Response) {
       console.error(error);
       return Observable.throw(error.json().error || 'Server error');
    }

}

