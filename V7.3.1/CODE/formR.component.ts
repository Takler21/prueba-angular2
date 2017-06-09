import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges,ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {UtilsServices} from './utils.service'

@Component({
    selector: 'form-req',
    templateUrl: 'app/formR.component.html',
    providers: [UtilsServices],
})
export class FormReq implements OnChanges {
    @Input() key: string; //creo que aqui es input porque  el valor vendra del otro componente
    @Input() tipes: string[];
    @Input() obj: any;
    @Input() campos: any;
    @Input() testid: any;
    @Input() validR: boolean;
    @Output() inputCreate = new EventEmitter();
    ocult: boolean = true;

    constructor(public utils: UtilsServices) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.inputCreate.emit(this.obj);
    }

    onCheck(v: boolean, key: string) {
            this.obj[key] = v;
    }

    ocultar() {
        this.ocult = !this.ocult;
    }

}