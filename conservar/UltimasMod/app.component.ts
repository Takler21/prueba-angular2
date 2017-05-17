import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {AppServices} from './search.service';
import {Post, Datos, Varios} from './post.interface';

let api = "heroes";
const DATA2 = "http://localhost:3000/" + api + "/";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [AppServices],


})
//<td [(ngModel)]="post.datos[t]" ngDefaultControl contenteditable='true'>
//{{post.datos[t]}} </td>   Funciona para usar parametros en el binding
//para pasar la clave al array hay que hacerlo como si fuera un string array["clave"]

export class AppComponent implements OnInit {
    @Input() datos: any[];
    errorMessage: any;
    test: any;
    lee: any;
    @Input() tipes: any[] = [];
    @Input() keys2: string[] = [];
    @Input() keys: string[] = [];
    @Input() optionals: string[] = [];
    validation: boolean = true;
    constructor(public appservice: AppServices) {
    }



    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD, 
    //Los metodos JSON son para que test coja el valor de test sin vincularse a post
    ngOnInit() {
        api = "art"
        this.appservice.getJSON(DATA2).subscribe(res =>
            this.datos = res,
            error => this.errorMessage = error,
            () => {
                this.sacar();
                this.test = JSON.parse(JSON.stringify(this.datos[0]));
            });
    }
    //Saca las claves y los tipos de los elementos, asi como los campos opcionales

    sacar() {
        this.datos.forEach(post => {
            let t3: string[] = [];
            let t4: any[] = [];
            let aux: any = Object.keys(post);

            if (this.keys2.length == 0)
                this.keys2 = Object.keys(post);

            Object.keys(this.keys2).forEach(key => {
                if ((this.keys2[key] != aux[key] && this.optionals[this.keys2[key]] != this.keys2[key]) || post[aux[key]]=== "") {
                    this.optionals[this.keys2[key]] = this.keys2[key]
                }
            });

            Object.keys(aux).forEach(key => {
                if (this.keys2[key] != aux[key]) {
                    this.keys2[key] = aux[key]
                    this.optionals[this.keys2[key]] = this.keys2[key];
                }
            });

            this.keys2.forEach(key => {
                //el orden de cuando t4 coge los keys
                if (this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
                if (this.keys != t3) {
                    //if this.keys == null o [])?
                    Object.keys(t3).forEach(a => {
                        if (this.keys[a] != t3[a]) {
                            this.keys[a] = t3[a];
                            this.optionals[this.keys[a]] = this.keys[a];
                        }
                    });
                    Object.keys(this.keys).forEach(a => {
                        if (this.keys[a] != t3[a] && this.optionals[this.keys[a]] != this.keys[a])
                            this.optionals[this.keys[a]] = this.keys[a];
                    });
                }
                this.keys.forEach(k => {
                    if (post[key][k] != null) {
                        if (this.keys[k] == null)
                            this.tipes[k] = this.isType(post[key][k]);
                    }
                });
                if (this.tipes[key] == null)
                    this.tipes[key] = this.isType(post[key]);
            });
        });

        this.lee = Object.keys(this.keys) + "   ;   " + Object.keys(this.keys2) + "   ;   " + Object.keys(this.tipes) + "   ;   " + Object.keys(this.optionals) + "   ;   " + this.tipes["age"]
    }

    isObject(val) { return typeof val === 'object'; }

    isType(val) { return typeof val; }

    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    onCheck(v: boolean, key2: string, key: string) {
        this.test[key2][key] = v;
    }

    //haber si podemos eliminar la dependencia en variables locales, El id lo presupondremos como clave primaria de los elementos.
    addb() {
        if (this.validar(this.test)) {
            let idp: number = 1;
            let cont = true
            this.datos.forEach(post => {
                if (cont) {
                    if (post.id == idp)
                        idp = idp + 1;
                    else
                        cont = false;
                }
            });
            this.test.id = idp;

            this.appservice.add(DATA2, this.test).subscribe(
                data => null,
                error => this.errorMessage = <any>error,
                () => this.appservice.getJSON(DATA2).subscribe(res =>
                    this.datos = res)
            );
            this.datos.sort;
        }

    }

    //tal vez mejor llevarlo a otro componente si es que acabo haciendo la tabla y el formulario en otro componente
    alform(post) {
        //this.title = post.datos.title;
        //this.category = post.datos.category;
        //this.id = post.id;
        //this.estado = post.varios.estado;
        this.test = JSON.parse(JSON.stringify(post));
    }
    //haber si podemos eliminar completamente la dependencia en variables locales.
    modificar(post) {
        if (this.validar(this.test)) {
            this.appservice.update(DATA2, this.test).subscribe(
                data => null,
                error => this.errorMessage = <any>error,
                () => this.appservice.getJSON(DATA2).subscribe(res =>
                    this.datos = res)
            );
        }
    }

    delet(post) {
        this.appservice.delete(DATA2, post.id).subscribe(
            data => null,
            error => this.errorMessage = <any>error,
            () => this.appservice.getJSON(DATA2).subscribe(res =>
                this.datos = res)
        );
    }

    validar(post) {
        let val = true;
        for (let p of this.datos) {
            if(p.id !== post.id)
            if (post.name == p.name) {
                val = false;
            };
        };
        this.validation = val;
        return val;
    }
}