import {Component, OnInit, Input} from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
import {AppServices} from './search.service'
import {Post} from './post.interface'

@Component({
    selector: 'my-app',
    template: `
          <div id="main">
          
               <div id = "header"></div>
               <div id = "content">
                 <h1>Gestor JSON Angular 2</h1>
                <label for="sel">Seleccione un titulo</label>
                <select #sel [(ngModel)]="test" (change)="onChange($event)" >
                    <option selected></option>
                    <option *ngFor="let post of datos" [ngValue]="post">{{post.title}}</option>
                </select>

                <hr>
               <p>Titulo:   <input [(ngModel)]="title" /> <br /><br />
               Categoria:   <input [(ngModel)]="category" /></p>
               </div>
               <button #btn1 (click)="addb($event)">Añadir</button>
          </div>
  		 `,
    providers: [AppServices]
})
//En lugar de cargar en el select podriamos cargar en eun array y de este mostar en el select.
export class AppComponent implements OnInit {
    datos: Post[];
    test: Post;
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
        if (this.test) {
            this.id = this.test.id;
            this.title = this.test.title;
            this.category = this.test.category;
        }     
    }
    onChange($event)// tal vez pueda reducirlo;
    {
        
        if (this.test)
        {
            this.id = this.test.id;
            this.title = this.test.title;
            this.category = this.test.category;      
        }
        
    }

    addb($event) {
        let obj: Post;
        let idp: number = this.datos.length + 1;
        
        if (this.test) {
            obj = { id: idp, title: this.title, category: this.category };
            this.appservice.add(obj).subscribe();  
        }
    }


    }
