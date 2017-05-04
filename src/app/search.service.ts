import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import {Route} from '@angular/router';
import { Http, Response, Headers, RequestOptions, Request, RequestMethod, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class AppServices {


    constructor(public http: Http, public jsonp: Jsonp){}

    headers = new Headers({
       
        'Content-Type': 'application/json',
        'Accept': 'application/json',  
    });



    public getJSON(): Observable<any> {
        return this.http.get("http://localhost:3000/art")
            .map((res: any) => res.json())
            .catch((error: any) => console.log(error));
    }

    public add(body: any): Observable<any> {
        let options = new RequestOptions({
            method: RequestMethod.Post,
            headers: this.headers,
            body: JSON.stringify(body),
            url: "http://localhost:3000/art"
        });
        return this.http.request(new Request(options));
    }

    public update(body: any): Observable<any>
    {
        let options = new RequestOptions({
            method: RequestMethod.Put,
            headers: this.headers,
            body: JSON.stringify(body),
            url: 'http://localhost:3000/art/' + body.id
        });
        return this.http.request(new Request(options))
           
    }

    public delete(id): Observable<any> {
        let aux: any;
        let options = new RequestOptions({
            method: RequestMethod.Delete,
            headers: this.headers,
            url: 'http://localhost:3000/art/' + id
          });
        return this.http.request(new Request(options));
        
          
    }
}

 // let bodyString = JSON.stringify(body); // Stringify payload
 //let headers = new Headers({ 'Content-Type': 'application/json' });

 //return this.http.post("data.json", JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })
        //  .map((res: Response) => res.json())
        //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));