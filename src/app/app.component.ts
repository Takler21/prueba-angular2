import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import {AppServices} from './search.service';
import {Post, Datos, Varios} from './post.interface';

const DATA2 = "http://localhost:3000/art/";
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
    estado: boolean = true;
    lee: any;
    @Input() tipes: any[] = [];
    @Input() keys2: string[] = [];
    @Input() keys: string[] = [];
    caca: any;
    constructor(public appservice: AppServices) {
    }

   

    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD, 
    //Los metodos JSON son para que test coja el valor de test sin vincularse a post
    ngOnInit() {
        this.appservice.getJSON(DATA2).subscribe(res =>
            this.datos = res,
            error => this.errorMessage = error,
            () => {
                this.sacar();
                this.test = JSON.parse(JSON.stringify(this.datos[0]));
            });
    }
    //Saca las claves y los tipos de los elementos del primer nivel
    sacar() {
        //No uso datos[0] debido a habra que considear los valores opcionales, el proceso para obtener todas las llaves esta hecho, falta el confirmar opcionales
        
            this.datos.forEach(post => {
                if (this.keys2 != Object.keys(post))
                    this.keys2 = Object.keys(post);
                let t3: string[] = [];
                let t4: any[] = [];
                let aux: any;
                this.keys2.forEach(key => {     
                        t4[key] = this.isType(post[key]);
                    this.keys.forEach(k => {
                        if (post[key][k] != null)
                            t4[k] = this.isType(post[key][k]);
                    });
                        if (this.isObject(post[key]))
                            t3 = t3.concat(Object.keys(post[key]));
                    });
                    if (this.keys != t3)
                        this.keys = t3;
                    this.tipes = t4;
                    this.lee = t4["datos"];
        });
            this.caca = Object.keys(this.datos);
    }

    isObject(val) { return typeof val === 'object'; }

    isType(val) { return typeof val; }

    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    onCheck(v: boolean, key2: string, key:string) {
        this.test[key2][key] = v;
    }

    //haber si podemos eliminar la dependencia en variables locales, El id lo presupondremos como clave primaria de los elementos.
    addb() {
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
        this.appservice.update(DATA2, this.test).subscribe(
            data => null,
            error => this.errorMessage = <any>error,
            () => this.appservice.getJSON(DATA2).subscribe(res =>
                this.datos = res)
        );
    }

    delet(post: Post) {
        this.appservice.delete(DATA2, post.id).subscribe(
            data => null,
            error => this.errorMessage = <any>error,
            () => this.appservice.getJSON(DATA2).subscribe(res =>
                this.datos = res)
        );
    }
}