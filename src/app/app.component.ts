import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { NgFor, NgIf}         from '@angular/common';
import {AppServices} from './search.service';
import {Post, Datos, Varios} from './post.interface';

@Component({
    selector: 'my-app',
    template: `
            
          <div class="container" id="main">
           <div class="center-block">    
               <div id = "header"></div>
               <div id = "content">
               
                 <h1>Gestor JSON Angular 2</h1>
                <label for="sel">Seleccione un titulo</label>
                <table class="table table-striped">
                    <thead><tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr></thead>
                    <tbody>
                    <tr *ngFor="let post of datos">
                        <td>{{post.id}}</td>
                        <td>{{post.datos?.title}}</td>
                        <td>{{post.datos?.category}}</td>
                        <td><button type="button" class="btn btn-warning" (click)="alform(post)" >Añadir</button>
                            
                            <button type="button" class="btn btn-warning" (click)="delet(post)">Eliminar</button></td></tr>
                    </tbody>
                </table>

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

                    <div class="panel panel-default">

                    <my-collap nombre="varios">
                            
                        <div class="panel-body">
                        <div class="form-group row"> 
                        <label class="col-sm-1 col-form-label">Estado: </label>   
                        <div class="col-sm-3">
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck($event.target.value)" [checked]="estado" value=0 />Disponible</label>
                            <label class="radio-inline"><input type="radio" name="disponibilidad" (change)="onCheck($event.target.value)" [checked]="!estado" value=1 />agotado</label>
                        </div>
                        </div>
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
    providers: [AppServices]
})

//En lugar de cargar en el select podriamos cargar en eun array y de este mostar en el select.
export class AppComponent implements OnInit {
    @Input() datos: Post[];
    errorMessage: any;
    id: number;
    title: string;
    category: string;
    estado: boolean; t = true; f = false;
    constructor(public appservice: AppServices) {
    }

    ngOnInit() {
        this.appservice.getJSON().subscribe(res =>
            this.datos = res).closed;
        this.datos.forEach(res => {

        });
    }

    ngOnchange(changes: SimpleChanges) {
       //if (changes['datos'])
       this.appservice.getJSON().subscribe(res =>
            this.datos = res);
    }

    onCheck(v: any) {
        if (v == 0)
            this.estado = true;
        else
            this.estado = false;
    }

    addb() {
        let obj: Post;
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
        obj = {id: idp, datos: { title: this.title, category: this.category }, varios: { estado: this.estado }};
            this.appservice.add(obj).subscribe(
                per => this.datos.push(per),
                error => this.errorMessage = <any>error);
        this.datos.sort;
        this.appservice.getJSON().subscribe(res =>
            this.datos = res);
    }

    alform(post)
    {
        this.title = post.datos.title;
        this.category = post.datos.category;
        this.id = post.id;
        this.estado = post.varios.estado;
    }

    modificar(post) {
        let obj: Post;
        obj = {id: this.id, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.update(obj).subscribe();
        this.appservice.getJSON().subscribe(res =>
            this.datos = res);
    }

    delet(post) {
        this.appservice.delete(post.id).subscribe().closed;
        this.appservice.getJSON().subscribe(res =>
            this.datos = res);   
        this.appservice.getJSON().subscribe(res =>
            this.datos = res); 
    }
}

