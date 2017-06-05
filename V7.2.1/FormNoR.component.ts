import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {UtilsServices} from './utils.service'

@Component({
    selector: 'form-noReq',
    templateUrl: 'app/formNoR.component.html',
    providers: [UtilsServices],
})
export class FormNoReq implements OnChanges {
    @Input() key: string; //creo que aqui es input porque  el valor vendra del otro componente
    @Input() tipes: string[];
    @Input() obj: any;
    @Input() campos: any;
    @Input() testid: any;
    @Input() validR: boolean;
    @Output() inputCreate = new EventEmitter();

    constructor(public utils: UtilsServices) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.inputCreate.emit(this.obj);
    }

    clRadio(check: boolean, key: string, val: boolean) {
        if (check == false && val == this.obj[key]) {
            this.obj[key] = null;
        }
        else {

            this.obj[key] = val;
        }
    }

}