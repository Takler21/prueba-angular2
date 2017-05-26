import {Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges,ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'


@Component({
    selector: 'form-req',
    templateUrl: 'app/formR.component.html',
})
export class FormReq implements OnChanges {
    @Input() key: string; //creo que aqui es input porque  el valor vendra del otro componente
    @Input() tipes: string[];
    @Input() obj: any;
    @Output() inputCreate = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        this.inputCreate.emit(this.obj);
    }

    onCheck(v: boolean, key: string) {
            this.obj[key] = v;
    }
}