import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PerService {

   people: Array<any>;

    constructor(private http: Http) {}

    getPeople() {
        return this.http.get('./data/data.json/persona').map(response => Response.json().data);
    }
    }
