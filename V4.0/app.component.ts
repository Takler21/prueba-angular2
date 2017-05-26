import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {AppServices} from './search.service';

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
    messageE = ['Criterios no cumplidos:'];
    @Input() tipes: any[] = [];
    @Input() keys: string[] = [];
    @Input() keys3: string[] = [];
    @Input() keysHijas: string[] = [];
    @Input() sons: string[] = [];
    @Input() optionals: string[] = [];
    @Input() buscado: any[] = [];
    validation: boolean = true;
    lee: any;
    constructor(public appservice: AppServices) {
    }



    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD, 
    //Los metodos JSON son para que test coja el valor de test sin vincularse a post
    ngOnInit() {
        api = "art";
        this.appservice.getJSON(DATA2).subscribe(res =>
            this.datos = res,
            error => this.errorMessage = error,
            () => {
                this.sacar();
                this.test = JSON.parse(JSON.stringify(this.datos[0]));
                this.iniciarBuscado();
            });
    }

    //Saca las claves y los tipos de los elementos, asi como los campos opcionales
    iniciarBuscado() {
        this.keys.forEach(k => {
            if (this.tipes[k] != "object")
                this.buscado[k] = null;
        })
        this.keysHijas.forEach(k => {
            if (this.tipes[k] != "object")
                this.buscado[k] = null;
        })
    }

    buscar(post: any) {
        let vacio = true
        this.keys.forEach(key => {
            if (this.tipes[key] != "object") {
                if (String(post[key]).toLowerCase().indexOf(String(this.buscado[key]).trim()) == -1 && this.buscado[key] != null)
                    vacio = false;
            }
        });
        this.keysHijas.forEach(keyH => {
            if (this.tipes[keyH] != "object") {
                if (String(post[this.sons[keyH]][keyH]).toLowerCase().indexOf(String(this.buscado[keyH]).trim()) == -1 && this.buscado[keyH] != null)
                    vacio = false;
            }
        });
        this.lee = this.buscado["estado"];
        return vacio;      
    }

    sacar() {
        this.datos.forEach(post => {
            let t3: string[] = [];
            let aux: string[] = Object.keys(post);

            //Extraer llaves iniciales del primer nivel
            if (this.keys.length == 0) { //Iniciar los valores
                this.keys = Object.keys(post);
                this.keys.forEach(key => {
                    this.tipes[key] = this.isType(post[key]);
                });
            }

            else {

                //Extrae los campos opcionales del primer nivel, ademas de obtener su tipo
                if (this.keys != aux) {
                    Object.keys(this.keys).forEach(key => {
                        if (this.keys[key] != aux[key] && this.optionals[this.keys[key]] != this.keys[key]) {
                            let esta = false;
                            aux.forEach(k2 => {
                                if (k2 == this.keys[key])
                                    esta = true;
                            });
                            if (!esta)
                                this.optionals[this.keys[key]] = this.keys[this.keys[key]];
                            else {
                                if (!this.optionals[aux[key]] && !this.tipes[aux[key]]) {

                                    this.keys.forEach(k2 => {
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

            // //Extraer llaves iniciales del segundo nivel
            if (this.keysHijas.length == 0) { //Iniciar los valores
                this.keys.forEach(key => {
                    if (this.isObject(post[key]))
                        t3 = t3.concat(Object.keys(post[key]));
                    Object.keys(t3).forEach(a => {
                        this.keysHijas[a] = t3[a];
                        if (!this.sons[t3[a]])
                            this.sons[t3[a]] = key;
                    });

                });
            }

            //Saca los elementos opcionales del segundo nivel, ademas de vincular cada elemento con su padre
            this.keys.forEach(key => {
                if (this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
                if (this.keysHijas != t3) {
                    t3.forEach(a => {
                        let esta = false;
                        this.keysHijas.forEach(k => {
                            if (k == a) {
                                esta = true;
                            }
                        });
                        if (!esta) {
                            this.keysHijas.push(a);
                            if (!this.optionals[a])
                                this.optionals[a] = a;
                            if (!this.sons[a])
                                this.sons[a] = key;
                        }
                    });
                }

                if (this.tipes[key] == null)
                    this.tipes[key] = this.isType(post[key]);
            });

            //Saca los tipos de los elementos opcionales de los elementos mayores, y les vincula sus respectivos elementos hijos.
            this.keys3.forEach(key => {
                if (this.tipes[key] == null)
                    this.tipes[key] = this.isType(post[key]);
                if (this.tipes[key] == "object") {
                    t3 = t3.concat(Object.keys(post[key]));
                    Object.keys(t3).forEach(a => {
                        this.keysHijas[a] = t3[a];
                        if (!this.sons[t3[a]])
                            this.sons[t3[a]] = key;
                    });
                }
            });

            //Saca los tipos de los elementos menores
            this.keysHijas.forEach(k => {
                if (post[this.sons[k]][k] != null) {
                    if (!this.tipes[k]) {
                        this.tipes[k] = this.isType(post[this.sons[k]][k]);
                    }
                }
            });
        });

        //Añade las llaves de los elementos opcionales al conjuntos de llaves mayores.
        this.keys = this.keys.concat(this.keys3);
        
    }

    isObject(val) { return typeof val === 'object'; }

    isType(val) { return typeof val; }

    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    onCheck(v: boolean, key: string) {
        if (this.sons[key])
            this.test[this.sons[key]][key] = v;
        else
            this.test[key] = v;
    }


    clRadio(obj, check: boolean, key: string, val: boolean) {
        if (check == false && val == this.buscado[key]) {
            obj[key] = null;
        }
        else {
            
            obj[key] = val;
        }
    }

    //El metodo que usaremos para añadir mediante post objetos al json, en el se le asignara un id
    //que en caso de que se borrara uno con un id inferior al ultimo el objeto ocupara el id faltante.
    addb(test) {
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
        test.id = idp;
        if (this.validar(test)) {
            this.appservice.add(DATA2, this.test).subscribe(
                data => null,
                error => this.errorMessage = <any>error,
                () => this.appservice.getJSON(DATA2).subscribe(res =>
                    this.datos = res)
            );
            this.datos.sort;
        }

    }

    //Pasa los valores del post objetivo al formulario, en el cual se podra modificar
    alform(post) {
        this.test = JSON.parse(JSON.stringify(post));
    }

    //Modificara el valor del objeto dentro del json al que se hace referencia.
    modificar(post) {
        if (this.validar(post)) {
            this.appservice.update(DATA2, post).subscribe(
                data => null,
                error => this.errorMessage = <any>error,
                () => this.appservice.getJSON(DATA2).subscribe(res =>
                    this.datos = res)
            );
        }
    }

    //Elimina el objeto correspondiente.
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
            if (p.id !== post.id)
                if (post.data.title == p.data.title) {
                    this.messageE.push('- No repita titulos');
                    val = false;

                };
        };

        this.validation = val;
        return this.validation;

    }
}