
import { Component, OnInit,  Inject, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { PerService } from './per.service';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'my-person',
    providers: [PerService],
    template: `
         <h1>Hello from the {{ componentName }}!</h1>
    <div *ngFor="let p of people | async">
        <h3>Name: {{ p.name }}</h3> 
        <h4>Age: {{ p.age }}</h4> 
    </div>
    `
})

export class FriendComponent {

    componentName: 'PersonComponent';
   
    constructor( @Inject(forwardRef(() => PerService)) public perService: PerService) {
        this.people = perService.getPeople().subscribe(data => { this.people = data });
    }
} 

@Component({
    selector: 'my-input',
    template: `
    <select (change)="onChange($event.target.value)" [value]="ind">
        <option value=0> Persona 1</option>
        <option value=1> Persona 2</option>
    </select>
    <my-person></my-person>
`,
})

export class MyInputComponent {
    @Input() ind: number; //creo que aqui es input porque  el valor vendra del otro componente
    @Output() perCh = new EventEmitter();

    onChange(ind: number) {
        this.perCh.emit(ind);
    }
}

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {

    obj = JSON.parse('{	"persona": [{ "valores": { "name": "John", "age": 30, "city": "New York" },  "varios": { "gender": "1" } }, { "valores": { "name": "pepa", "age": 20, "city": "Cadiz" }, "varios": { "gender": "0" }}]}');
    nom1: string = "Nombre";
    nom2: string = "Edad";
    nom3: string = "Ciudad";
    nom4: string = "Genero";
    ind = 1;

    nombre1: string = 'propiedades';
    nombre2: string = 'valores';
    nombre3: string = 'varios';

    logs: string[] = [];

    log(message) {
        this.logs.push(message);
    }
}




