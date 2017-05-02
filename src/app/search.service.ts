import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import {Route} from '@angular/router';
import { Http, Response, Headers, RequestOptions, Request, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class AppServices {

    constructor(public http: Http) {
       
    }

    headers = new Headers({
       
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      
         
    });

    public getJSON(): Observable<any> {
        return this.http.get("data.json")
            .map((res: any) => res.json())
            .catch((error: any) => console.log(error));

    }

    add(body: any): Observable<any> {
        
       // let bodyString = JSON.stringify(body); // Stringify payload
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            method: RequestMethod.Post,
            url: "data.json",
            headers: this.headers
        });

        //return this.http.post("data.json", JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })
          //  .map((res: Response) => res.json())
        //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        return this.http.request(new Request(options))
        

    }
}