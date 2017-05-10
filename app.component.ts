import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import { NgFor, NgIf}         from '@angular/common';
import {AppServices} from './search.service';
import {Post, Datos, Varios} from './post.interface';

const DATA2 = "http://localhost:3000/art/";
@Component({
    selector: 'my-app',
    template: `
            
          <div class="container" id="main">
           <div class="center-block">    
               <div id = "header"></div>
               <div id = "content">
               
              <h1>Gestor JSON Angular 2</h1>
               
                <table class="table table-striped">

                    <thead>
                    <tr *ngIf="datos">
                        <template ngFor let-key2 [ngForOf]="keys2" let-key2Index="index">
                            <th *ngIf="!isObject(datos[0][key2])" ngDefaultControl >{{key2}}</th> 
                        <template ngFor let-key [ngForOf]="keys" let-keyIndex="index">
                            <th *ngIf="datos[0][key2][key] !== empty" ngDefaultControl >{{key}}</th> 
                        </template>
                        </template>
                        <th>Opciones</th>   
                    </tr>
                    </thead>

                    <tbody>
                    <tr *ngFor="let post of datos | sortBy : 'id'">    
                        <template ngFor let-key2 [ngForOf]="keys2" let-key2Index="index">
                            <td *ngIf="!isObject(post[key2])" ngDefaultControl >{{post[key2]}}</td> 
                        <template ngFor let-key [ngForOf]="keys" let-keyIndex="index">
                            <td *ngIf="post[key2][key] !== empty" ngDefaultControl >{{post[key2][key]}}</td> 
                        </template>
                        </template>
                        <td><button type="button" class="btn btn-warning" (click)="alform(post)" >Añadir</button>
                        <button type="button" class="btn btn-warning" (click)="delet(post)">Eliminar</button></td>   
                    </tr>
                    </tbody>
                </table>

                <hr>
               
                <div class="panel-group">
                <div class="panel panel-default">

<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

                <my-collap nombre="Articulos">
                    <div class="panel-body">
                    <div *ngIf="" class="panel panel-default">
                    <!-- Empezamos aqui el formulario -->
                     
                    <my-collap nombre="datos">
                        <div class="panel-body" *ngFor="let key of keys">     <!-- Empezamos aqui el formulario -->
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">{{key}}: </label>     
                        <div class="col-sm-3"><input class="form-control" [(ngModel)]="title" /></div>
                        </div>
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Categoria: </label>  
                        <div class="col-sm-3"><input class="form-control" [(ngModel)]="category" /></div>
                        </div>
                        </div>
                    </my-collap>
                    </div>
                    {{datos}}
                    <div class="panel panel-default">

                    <my-collap nombre="varios">     
                        <div class="panel-body">
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Estado: </label>   
                        <div class="col-sm-3">
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck(true)" [checked]="estado" value=true />Disponible</label>
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck(false)" [checked]="!estado" value=false />agotado</label>
                        </div>
                        </div>
                        </div>
                        {{estado}}
                            <div *ngIf="datos">
                        {{datos[0].datos?.title}}
                            </div>
                    </my-collap>

                    </div>
                    </div>
                </my-collap> 

               <button type="button" class="btn btn-warning" (click)="addb()">Añadir</button>
               <button type="button" class="btn btn-warning" (click)="modificar(post)">Modificar</button>
            </div>
            </div>

<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

                <!--<generator [datos]="datos" [url]="DATA2"></generator>-->
            </div>
            </div>
          </div>

  		 `,
    providers: [AppServices],

})
//<td [(ngModel)]="post.datos[t]" ngDefaultControl contenteditable='true'>
//{{post.datos[t]}} </td>   Funciona para usar parametros en el binding

export class AppComponent implements OnInit {
    @Input() datos: Post[];
    errorMessage: any;
    //Puede que declarando el metodo post en el el formulario pueda librarme de estas variables.
    //Inicio Variables
    id: number;
    title: string;
    category: string;
    estado: boolean = true;
    //fin variables
    @Input() keys2: string[]
    @Input() keys: string[]= []


    constructor(public appservice: AppServices) {
    }

    isObject(val) { return typeof val === 'object'; }

    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD
    ngOnInit() {
        this.appservice.getJSON(DATA2).subscribe(res =>
            this.datos = res,
            error => this.errorMessage = error,
            () => this.sacar());
    }

    sacar() {
        this.datos.forEach(post => {
            this.keys2 = Object.keys(post);
            let t3: string[] = [];
            if (this.keys) {
                this.keys2.forEach(key => {
                    t3 = t3.concat(Object.keys(post[key]))
                });
            this.keys = t3;
            }
        });
    };

    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    onCheck(v: boolean) {
        this.estado = v;
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
        let obj: Post = { id: idp, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.add(DATA2, obj).subscribe(
            data => null,
            error => this.errorMessage = <any>error,
            () => this.appservice.getJSON(DATA2).subscribe(res =>
                this.datos = res)
        );
        this.datos.sort;
    }

    //tal vez mejor llevarlo a otro componente si es que acabo haciendo la tabla y el formulario en otro componente
    alform(post: Post) {
        //this.title = post.datos.title;
        //this.category = post.datos.category;
        //this.id = post.id;
        //this.estado = post.varios.estado;
    }
    //haber si podemos eliminar completamente la dependencia en variables locales.
    modificar(post: Post) {
        let obj: Post;
        obj = { id: this.id, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.update(DATA2, obj).subscribe(
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