import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {AppServices} from './search.service';
import {Post, Datos, Varios} from './post.interface';

let api = "art";
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
    messageE = ['Criterios no cumplidos:'];
    @Input() tipes: any[] = [];
    @Input() keys2: string[] = [];
    @Input() keys3: string[] = [];
    @Input() keys: string[] = [];
    @Input() sons: string[] = [];
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
            let aux: string[] = Object.keys(post);

            //Extraer los campos que no aparecen en todos los post
            if (this.keys2.length == 0) { //Iniciar los valores
                this.keys2 = Object.keys(post);
                this.keys2.forEach(key => {
                    this.tipes[key] = this.isType(post[key]);
                });
            }

            else {

                if (this.keys2 != aux) {
                    Object.keys(this.keys2).forEach(key => {
                        if (this.keys2[key] != aux[key] && this.optionals[this.keys2[key]] != this.keys2[key]) {
                            let esta = false;
                            aux.forEach(k2 => {
                                if (k2 == this.keys2[key])
                                    esta = true;
                            });
                            if (!esta)
                                this.optionals[this.keys2[key]] = this.keys2[this.keys2[key]];
                            else {
                                if (!this.optionals[aux[key]] && !this.tipes[aux[key]]) {

                                    this.keys2.forEach(k2 => {
                                        if (k2 == aux[key])
                                            esta = false;
                                    });
                                    if (esta) {
                                        this.optionals[aux[key]] = aux[key];
                                        this.keys3.push(aux[key]);
                                    }
                                }
                            }

                        }
                    });
                    
                }
            }
            //Extraer los campos que no aparecen en todos los post
            if (this.keys.length == 0) { //Iniciar los valores
                this.keys2.forEach(key => {
                    if (this.isObject(post[key]))
                        t3 = t3.concat(Object.keys(post[key]));
                    //if (this.keys == null o []) ?
                    Object.keys(t3).forEach(a => {
                        this.keys[a] = t3[a];
                        if (!this.sons[t3[a]])
                            this.sons[t3[a]] = key;
                    });

                });
            }

            this.keys2.forEach(key => {
                if (this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
                if (this.keys != t3) {
                    //if (this.keys == null o []) ?
                    t3.forEach(a => {
                        let esta = false;
                        this.keys.forEach(k => {
                            if (k == a) {
                                esta = true;
                            }
                        });
                        if (!esta) {
                            this.keys.push(a);
                            if (!this.sons[a])
                                this.sons[a] = key;
                        }
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
            this.keys3.forEach(key => {
                if (this.tipes[key] == null)
                    this.tipes[key] = this.isType(post[key]);
                if (this.tipes[key] == "object") {
                    t3 = t3.concat(Object.keys(post[key]));
                    //if (this.keys == null o []) ?
                    Object.keys(t3).forEach(a => {
                        this.keys[a] = t3[a];
                        if (!this.sons[t3[a]])
                            this.sons[t3[a]] = key;
                    });
                }
            });

        });
        this.keys2 = this.keys2.concat(this.keys3);
        this.lee = Object.keys(this.optionals) + "   ;   " + Object.keys(this.keys2) + "   ;   " + Object.keys(this.keys) + "   ;   " + Object.keys(this.tipes) + "   ;   " + Object.keys(this.sons) + "   ;   " + this.keys2[1];
    }

    isObject(val) { return typeof val === 'object'; }

    isType(val) { return typeof val; }
    k2s(val) { return this.sons[val]; }

    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    onCheck(v: boolean, key2: string, key: string) {
        this.test[key2][key] = v;
    }
    onCheck2(v: boolean, key2: string) {
        this.test[key2] = v;
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

        let parser = new DOMParser();
        this.keys2.forEach(key2 => {
            if (this.tipes[key2] != 'object')
                post[key2] = parser.parseFromString(post[key2], 'text/html');
        });
        for (let p of this.datos) {
            if (p.id !== post.id)
                if (post.datos.title == p.datos.title) {
                    this.messageE.push('- No repita titulos');
                    val = false;

                };
        };
        this.keys2.forEach(key => {
            if (this.tipes[key] == "number") {
                try {
                    post[key] = parseInt(post[key]);
                }
                catch (e) {
                    val = false;
                    this.messageE.push("- Introduzca numeros donde corresponda.");
                }
            }
        });





        this.validation = val;

    }
}