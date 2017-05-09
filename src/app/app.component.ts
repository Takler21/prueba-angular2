import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';
import { NgFor, NgIf}         from '@angular/common';
import {AppServices} from './search.service';
import {Post, Datos, Varios} from './post.interface';
//Busco que la tabla y el formulario se generen automaticamente con el json file que se les pase, contar con que hay elementos anidados.

const DATA2 = "http://localhost:3000/art/";
@Component({
    selector: 'my-app',
    template: `
            
          <div class="container" id="main">
           <div class="center-block">    
               <div id = "header"></div>
               <div id = "content">
               
              <h1>Gestor JSON Angular 2</h1>
                <div *ngIf="datos">
                <table class="table table-striped">
                    <thead><tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr></thead>
                    <tbody>
                    
                    <tr *ngFor="let post of datos | sortBy : 'id'">
                        
                        <td>{{post.id}}</td>
                        <td>{{post.datos?.title}}</td>
                        <td>{{post.datos?.category}}</td>
                        <td><button type="button" class="btn btn-warning" (click)="alform(post)" >Añadir</button>
                        <button type="button" class="btn btn-warning" (click)="delet(post)">Eliminar</button></td>
                        
                    </tr>
                    </tbody>
                </table>
                </div>
                <hr>
               
                <div class="panel-group">
                <div class="panel panel-default">
                <my-collap nombre="Articulos">

                    <div class="panel-body">
                    <div class="panel panel-default">

                    <my-collap nombre="datos">

                        <div class="panel-body">
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Titulo: </label>     
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
            </div>
            </div>
          </div>
  		 `,
    providers: [AppServices],

})

export class AppComponent implements OnInit {
    @Input() datos: Post[];
    @Input() keys: any[];
    errorMessage: any;
    //Puede que declarando el metodo post en el el formulario pueda librarme de estas variables.
    //Inicio Variables
    id: number;
    title: string;
    category: string;
    estado: boolean = true;
    //fin variables
    

    constructor(public appservice: AppServices) {
    }


    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD
    ngOnInit() {
        this.appservice.getJSON(DATA2).subscribe(res =>
            this.datos = res,
            error => this.errorMessage = error,
            () => this.keys = this.datos ? Object.keys(this.datos) : []);
    }
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
        this.appservice.add(DATA2,obj).subscribe(
            per => this.datos.push(per),
            error => this.errorMessage = <any>error,
            () => this.appservice.getJSON(DATA2).subscribe(res =>
                this.datos = res)
        );
        this.datos.sort;      
    }

    //tal vez mejor llevarlo a otro componente si es que acabo haciendo la tabla y el formulario en otro componente
    alform(post: Post) { 
        this.title = post.datos.title;
        this.category = post.datos.category;
        this.id = post.id;
        this.estado = post.varios.estado;
    }
    //haber si podemos eliminar completamente la dependencia en variables locales.
    modificar(post: Post) {
        let obj: Post;
        obj = { id: this.id, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.update(DATA2, obj).subscribe();
        this.appservice.getJSON(DATA2).subscribe(
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
