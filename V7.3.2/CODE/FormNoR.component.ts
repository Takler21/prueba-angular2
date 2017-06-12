import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {UtilsServices} from './utils.service';
import {AppServices} from './search.service';

@Component({
    selector: 'form-noReq',
    templateUrl: 'app/formNoR.component.html',
    providers: [UtilsServices],
})
export class FormNoReq implements OnChanges, OnInit {
    @Input() key: string; //creo que aqui es input porque  el valor vendra del otro componente
    @Input() tipes: string[];
    @Input() obj: any;
    @Input() campos: any;
    @Input() testid: any;
    @Input() validR: boolean;
    @Output() inputCreate = new EventEmitter();
    ocult: boolean = true;
    public customSelected: string;
    public statesComplex: any[];

    constructor(public utils: UtilsServices, public appservice: AppServices) {
    }

    ngOnInit() {
        this.appservice.getJSON('http://localhost:5000/estados/').subscribe(res =>
            this.statesComplex = res);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.inputCreate.emit(this.obj);
    }

    ocultar() {
        this.ocult = !this.ocult;
    }

    clRadio(check: boolean, key: string, val: boolean) {
        if (check == false && val == this.obj[key]) {
            this.obj[key] = null;
        }
        else {

            this.obj[key] = val;
        }
    }

    comprobar() {
        let st: string;
        this.statesComplex.forEach(state => {
            if (this.obj[this.key].toLowerCase().trim() == state.name.toLowerCase().trim())
                st = state.name;
        });
        this.obj[this.key] = st;
    }

}