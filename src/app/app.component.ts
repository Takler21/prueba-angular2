import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import {AppServices} from './search.service';
import {Post} from './post.interface';


@Component({
    selector: 'my-app',
    template: `
          <div id="main">
          
               <div id = "header"></div>
               <div id = "content">
                 <h1>Gestor JSON Angular 2</h1>
                <label for="sel">Seleccione un titulo</label>
                <table>
                    <tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr>
                    <tr *ngFor="let post of datos">
                        <td>{{post.id}}</td>
                        <td><input [(ngModel)]="post.title" /></td>
                        <td><input [(ngModel)]="post.category" /></td>
                        <td><button (click)="alform(post)" >Añadir</button></td>
                    </tr>
                    
                </table>

                <hr>
                <my-collap nombre="Articulos">
                   <p>Titulo:   <input [(ngModel)]="title" /> <br /><br />
                   Categoria:   <input [(ngModel)]="category" /></p>
                </my-collap>
               </div>
               <button #btn1 (click)="addb($event)">Añadir</button>
          </div>
  		 `,
    providers: [AppServices]
})
//En lugar de cargar en el select podriamos cargar en eun array y de este mostar en el select.
export class AppComponent implements OnInit {
    datos: Post[];
    errorMessage: any;
    id: number;
    title: string;
    category: string;
    test2: Post;//Aunque el valor lo haquiera en el programa el el templat hay que usar la variable segura "?"
    verd = true;
    constructor(public appservice: AppServices) {
    }
    ngOnInit() {
        this.appservice.getJSON().subscribe(res =>
            this.datos = res);
        
    }

    addb($event) {
        let obj: Post;
        let idp: number = this.datos.length + 1;
        
        
            obj = { id: 7, title: this.title, category: this.category };
            this.appservice.add(obj).subscribe(
                per => this.datos.push(per),
                error => this.errorMessage = <any>error);  
    }

    alform(post)
    {
        this.title = post.title;
        this.category = post.category;
        this.id = post.id;
    }

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['datos']) {

        }
    }

    logs: string[] = [];

    log(message) {
        this.logs.push(message);


    }
}
