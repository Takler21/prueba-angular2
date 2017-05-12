import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ChangeDetectionStrategy} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
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
 
            <!-- EMPIEZA LA TABLA -->
              
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
                            <td *ngIf="post[key2][key] !== empty" >{{post[key2][key]}}</td> 
                        </template>
                        </template>
                        <td><button type="button" class="btn btn-warning" (click)="alform(post)" >Añadir</button>
                        <button type="button" class="btn btn-warning" (click)="delet(post)">Eliminar</button></td>   
                    </tr>
                    </tbody>
                </table>

            <!-- ACABA LA TABLA -->
                <hr>

               
                <div class="panel-group">
                <div class="panel panel-default">   

                <my-collap nombre="Articulos" id="Articulos">

                <!-- EMPIEZA EL FORMULARIO -->

                    <form #form="ngForm">
                    <div class="panel-body">
                    <div class="panel panel-default">
                    <!-- Empezamos aqui el formulario -->
                    <template ngFor let-key2 [ngForOf]="keys2" let-key2Index="index">

                    <div *ngIf="tipes[key2]=='object'" class="panel panel-default">

                    <my-collap [nombre]="key2" [id]="key2">
                        <div class="panel-body">     <!-- Empezamos aqui el formulario -->
                        <template ngFor let-key [ngForOf]="keys">
                        <div *ngIf="datos[0][key2][key]!== empty" class="form-group row"> 
                            <label class="col-sm-1 col-form-label">{{key}}: </label>     
                            <div class="col-sm-3"><input class="form-control" [name]="key" [(ngModel)]="test[key2][key]" /></div>
                        </div>
                        </template>
                        </div>
                    </my-collap>
                    </div>     
                        <div *ngIf="tipes[key2]!='object'" class="form-group row"> 
                        <label class="col-sm-1 col-form-label">{{key2}}: </label>     
                        <div class="col-sm-3"><input class="form-control" [name]="key2" [(ngModel)]="test[key2]" /></div>
                        </div>
                    </template>
                   <!-- {{datos}} -->
                     
                <!--    <div class="panel-body">
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Estado: </label>   
                        <div class="col-sm-3">
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck(true)" [checked]="estado" value=true />Disponible</label>
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck(false)" [checked]="!estado" value=false />agotado</label>
                        </div>
                        </div>
                        </div> -->

                    </div>
                    </div>
                    </form>
                
                <!-- ACABA EL FORMULARIO -->

                </my-collap> 

               <button type="button" class="btn btn-warning" (click)="addb(test)">Añadir</button>
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
    @Input() datos: any[];
    errorMessage: any;
    test: any;
    estado: boolean = true;

    @Input() tipes: any[] = [];
    @Input() keys2: string[];
    @Input() keys: string[] = [];
    
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
        this.datos.forEach(post => {
            this.keys2 = Object.keys(post);
            let t3: string[] = [];
            let t4: any[] = [];
            if (this.keys.length == 0) {
                this.keys2.forEach(key => {
                    t4[key] = this.isType(post[key]);
                    if (this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
                });
                this.keys = t3;
                this.tipes = t4;
            }
        });
    };

    isObject(val) { return typeof val === 'object'; }

    isType(val) { return typeof val; }

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