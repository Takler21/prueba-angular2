import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'city-dropdown',
    template: `
        <select (change)="onChange($event.target.value)" [value]="city">
            <option value=""></option>
            <option value="Ankarsrum">Ankarsrum</option>
            <option value="Västervik">Västervik</option>
            <option value="Stockholm">Stockholm</option>
        </select>
    `
})
export class CityComponent {
    @Input() city: string; //creo que aqui es input porque  el valor vendra del otro componente
    @Output() cityChange = new EventEmitter();

    onChange(city: string) {
        this.cityChange.emit(city);
    }
}

@Component({
    selector: 'my-input',
    template: `
        <input [(ngModel)]="username"> 
        <city-dropdown [city]="city" (cityChange)="city = $event"></city-dropdown>
        <!--
            Same as above:
            <city-dropdown [(city)]="city"></city-dropdown>
        -->
        <br />
        Username: {{username}}
        <br />
        City: {{city}}
    `,
    
})
export class MyInputComponent {
    username = 'Jesse';
    city = 'Stockholm';
}