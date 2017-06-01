import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {AppServices} from './search.service';
import {AppSettings} from './app.settings'

@Component({
    selector: 'resal',
    template: ` 
        <ul *ngIf="esta" class="pull-right nav navbar-nav">
            <li>
                <a (click)="cargar()">Resaltar valores</a>
            </li>
        </ul>`,
    providers: [AppServices],
})

export class ResaltarComponent implements OnInit {
    errorMessage: any;
    @Input() iden: string[];
    indica: any;
    @Input() ids: any = [];
    esta = true;
    @Input() prueba: number;
    @Input() campos: Array<string[]> = [];
    @Input() tipes: string[];
    @Output() resalf = new EventEmitter();
    @Output() idf = new EventEmitter();

    constructor(public service: AppServices) {
    }

    ngOnInit() {
        
        this.service.getJSON(AppSettings.DATA3 + "db").subscribe(res =>
            this.indica = Object.keys(res),
            error => this.errorMessage = error,
            () => {
                this.camposFuncion();
            }
        );
    }

    camposFuncion() {
        let aux: string[];
        this.iden = Object.keys(this.indica[0]);
        this.iden.forEach(id => {
            if (typeof this.indica[id] != "object")


        })
        
    }

    cargar() {
        if (this.indica)
            this.idf.emit(this.indica[0]);
    }
}