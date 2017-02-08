import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ApiService {
    constructor(public http: Http) {}

    sendData(data: any) {

        // dummy endpoint for demostration purposes
        let endPoint = `https://jsonplaceholder.typicode.com/posts`;
        return this.http.post(endPoint, JSON.stringify(data))
            .map(res => res.json());        
    }
}