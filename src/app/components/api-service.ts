import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ApiService {
    constructor(public http: Http) {
        console.log('ApiService constructor!')
    }

    getCaseByUrnAndPostcode(obj: any) {
        // console.log('obj', obj)

        //let endPoint = `/cases-for-citizen?urn=${obj.caseUniqueReferenceNumber}&postcode=${obj.casePostcode}application/vnd.structure.query.case-by-urn-postcode+jsongetCaseByUrnAndPostcode`;
        let endPoint = `http://jsonplaceholder.typicode.com/posts/1`;

        setTimeout(() => {
            console.log('inside timeout')
            this.http.request(endPoint)
                        .subscribe((response: Response) => console.log('response', response.json())); 
        }, 5000)
    }
}